package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.configuration.VnPayConfig;
import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.dto.response.CreatePaymentResponse;
import com.cnpm.eLibrary_service.dto.response.VnPayCallbackResponse; // Thêm import
import com.cnpm.eLibrary_service.entity.Payment;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.enums.PaymentStatus;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.PaymentRepository;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.PaymentService;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import com.cnpm.eLibrary_service.util.VnPayUtil; // Thêm import
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal; // Thêm import
import java.net.URLEncoder; // Thêm import
import java.nio.charset.StandardCharsets; // Thêm import
import java.text.SimpleDateFormat; // Thêm import
import java.time.LocalDateTime; // Thêm import
import java.util.*; // Thêm import

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final VnPayConfig vnPayConfig;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionService userSubscriptionService;

    @Override
    @Transactional
    public CreatePaymentResponse createSubscriptionPayment(CreatePaymentRequest request, String username, HttpServletRequest httpReq) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USERNAME_NOT_EXISTED));

        SubscriptionPlan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));

        // Tạo Payment entity
        Payment payment = Payment.builder()
                .userId(user.getId())
                .planId(plan.getId())
                .amount(plan.getPrice()) //
                .status(PaymentStatus.PENDING)
                .paymentMethod("VNPay")
                .build();
        payment = paymentRepository.save(payment);

        String paymentUrl = createVnPayUrl(payment, plan, httpReq);
        return new CreatePaymentResponse(paymentUrl);
    }

    @Override
    @Transactional
    public VnPayCallbackResponse handleVnPayCallback(HttpServletRequest request) {
        try {
            Map<String, String> fields = new HashMap<>();
            Enumeration<String> params = request.getParameterNames();

            while (params.hasMoreElements()) {
                String key = params.nextElement();
                String value = request.getParameter(key);
                if (value != null && !value.isEmpty()) fields.put(key, value);
            }

            String vnp_SecureHash = fields.get("vnp_SecureHash");

            fields.remove("vnp_SecureHash");
            fields.remove("vnp_SecureHashType");


            String hashData = VnPayUtil.hashAllFields(fields);
            String myHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

            if (!myHash.equals(vnp_SecureHash)) {
                return new VnPayCallbackResponse("97", "Invalid Checksum");
            }

            Long paymentId = Long.parseLong(request.getParameter("vnp_TxnRef"));
            Payment payment = paymentRepository.findById(paymentId).orElse(null);

            if (payment == null) {
                return new VnPayCallbackResponse("01", "Order Not Found");
            }

            if (payment.getStatus() != PaymentStatus.PENDING) {
                return new VnPayCallbackResponse("02", "Order Already Processed");
            }

            long vnpAmount = Long.parseLong(request.getParameter("vnp_Amount")) / 100;
            if (payment.getAmount().compareTo(BigDecimal.valueOf(vnpAmount)) != 0) {
                return new VnPayCallbackResponse("04", "Invalid Amount");
            }

            String code = request.getParameter("vnp_ResponseCode");
            if ("00".equals(code)) {
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setTransactionId(request.getParameter("vnp_TransactionNo"));
                payment.setPaidAt(LocalDateTime.now());
                userSubscriptionService.activateSubscription(payment);
            } else {
                payment.setStatus(PaymentStatus.FAILED);
            }

            paymentRepository.save(payment);
            return new VnPayCallbackResponse("00", "Confirm Success");

        } catch (Exception e) {
            return new VnPayCallbackResponse("99", "Unknown Error");
        }
    }



    private String createVnPayUrl(Payment payment, SubscriptionPlan plan, HttpServletRequest req) {
        long amount = payment.getAmount().multiply(new BigDecimal(100)).longValue();
        String vnp_TxnRef = String.valueOf(payment.getId());
        String vnp_IpAddr = VnPayUtil.getIpAddress(req);

        Map<String, String> params = new HashMap<>();
        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", vnPayConfig.getTmnCode());
        params.put("vnp_Amount", String.valueOf(amount));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", vnp_TxnRef);
        params.put("vnp_OrderInfo", "Thanh toan goi " + plan.getName());
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl());
        params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        params.put("vnp_CreateDate", formatter.format(cld.getTime()));

        cld.add(Calendar.MINUTE, 15);
        params.put("vnp_ExpireDate", formatter.format(cld.getTime()));

        // Sắp xếp field
        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        // Build query + hashData
        StringBuilder query = new StringBuilder();
        Map<String, String> hashFields = new LinkedHashMap<>();

        for (String name : fieldNames) {
            String value = params.get(name);
            if (value == null || value.isEmpty()) continue;

            query.append(URLEncoder.encode(name, StandardCharsets.UTF_8))
                    .append("=")
                    .append(URLEncoder.encode(value, StandardCharsets.UTF_8))
                    .append("&");

            hashFields.put(name, value);
        }

        // Tạo hashData theo chuẩn (encode UTF-8)
        String hashData = VnPayUtil.hashAllFields(hashFields);

        String vnp_SecureHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

        query.append("vnp_SecureHash=").append(vnp_SecureHash);

        return vnPayConfig.getUrl() + "?" + query.toString();
    }

}