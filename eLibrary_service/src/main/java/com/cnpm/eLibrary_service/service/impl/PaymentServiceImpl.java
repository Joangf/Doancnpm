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
            for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
                String fieldName = params.nextElement();
                String fieldValue = request.getParameter(fieldName);
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    fields.put(fieldName, fieldValue);
                }
            }

            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            fields.remove("vnp_SecureHash");

            String hashData = VnPayUtil.hashAllFields(fields);
            String mySecureHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

            if (!mySecureHash.equals(vnp_SecureHash)) {
                log.warn("VNPay Checksum failed. VNPay hash: {}, My hash: {}", vnp_SecureHash, mySecureHash);
                return new VnPayCallbackResponse("97", "Invalid Checksum"); // Mã 97 của VNPay
            }

            Long paymentId = Long.parseLong(request.getParameter("vnp_TxnRef"));
            Payment payment = paymentRepository.findById(paymentId)
                    .orElse(null);

            if (payment == null) {
                log.error("Payment not found for id: {}", paymentId);
                return new VnPayCallbackResponse("01", "Order not found"); // Mã 01 của VNPay
            }

            if (payment.getStatus() != PaymentStatus.PENDING) {
                log.warn("Payment {} already processed", paymentId);
                return new VnPayCallbackResponse("02", "Order already confirmed"); // Mã 02
            }

            // Kiểm tra số tiền
            long vnpAmount = Long.parseLong(request.getParameter("vnp_Amount")) / 100;
            if (payment.getAmount().compareTo(BigDecimal.valueOf(vnpAmount)) != 0) {
                log.error("Invalid amount. Expected: {}, Actual: {}", payment.getAmount(), vnpAmount);
                return new VnPayCallbackResponse("04", "Invalid Amount"); // Mã 04
            }

            String responseCode = request.getParameter("vnp_ResponseCode");
            if ("00".equals(responseCode)) {
                log.info("Payment {} successful", paymentId);
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setTransactionId(request.getParameter("vnp_TransactionNo"));
                payment.setPaidAt(LocalDateTime.now());

                // Kích hoạt gói Subscription
                // Hàm này sẽ tự động hủy gói cũ
                userSubscriptionService.activateSubscription(payment);
            } else {
                log.warn("Payment {} failed. Response code: {}", paymentId, responseCode);
                payment.setStatus(PaymentStatus.FAILED);
            }

            paymentRepository.save(payment);
            return new VnPayCallbackResponse("00", "Confirm Success");

        } catch (Exception e) {
            log.error("Unknown error processing VNPay callback", e);
            return new VnPayCallbackResponse("99", "Unknown error"); // Mã 99
        }
    }

    // --- Private Helper Method ---
    private String createVnPayUrl(Payment payment, SubscriptionPlan plan, HttpServletRequest httpReq) {
        long amount = payment.getAmount().multiply(new BigDecimal(100)).longValue();
        String vnp_TxnRef = String.valueOf(payment.getId());
        String vnp_IpAddr = VnPayUtil.getIpAddress(httpReq);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnPayConfig.getTmnCode());
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan goi " + plan.getName());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.getReturnUrl());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        vnp_Params.put("vnp_CreateDate", formatter.format(cld.getTime()));

        cld.add(Calendar.MINUTE, 15); // Thêm 15 phút hết hạn
        vnp_Params.put("vnp_ExpireDate", formatter.format(cld.getTime()));

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (String fieldName : fieldNames) {
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                hashData.append('&');
                query.append('&');
            }
        }

        hashData.deleteCharAt(hashData.length() - 1); // Xóa dấu & cuối
        query.deleteCharAt(query.length() - 1); // Xóa dấu & cuối

        String vnp_SecureHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        return vnPayConfig.getUrl() + "?" + query.toString();
    }
}