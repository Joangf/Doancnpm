package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.configuration.VnPayConfig;
import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.entity.Payment;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.enums.PaymentStatus;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.repository.PaymentRepository;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import com.cnpm.eLibrary_service.util.VnPayUtil; // <--- Đã import Util
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt; // <--- Quan trọng để mock JWT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestPropertySource("/application-test.properties")
class PaymentControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionPlanRepository planRepository;

    @Autowired
    private VnPayConfig vnPayConfig;

    @MockitoBean
    private UserSubscriptionService userSubscriptionService;

    @MockitoBean
    private BookEsRepository bookEsRepository;

    private User user;
    private SubscriptionPlan plan;

    @BeforeEach
    void setup() {
        paymentRepository.deleteAll();
        planRepository.deleteAll();
        userRepository.deleteAll();

        // 1. Tạo User
        user = User.builder()
                .username("test_user")
                .password("hashed_pass")
                .build();
        user = userRepository.save(user);

        // 2. Tạo Plan
        plan = new SubscriptionPlan();
        plan.setName("Premium");
        plan.setPrice(new BigDecimal("100000"));
        plan.setDuration(30);
        plan = planRepository.save(plan);
    }

    // --- TEST 1: TẠO URL THANH TOÁN ---

    @Test
    void createPayment_Success() throws Exception {
        CreatePaymentRequest request = new CreatePaymentRequest(plan.getId());

        mockMvc.perform(post("/api/payment/create-payment")
                        .with(jwt().jwt(jwt -> jwt.subject("test_user")))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.paymentUrl").exists())
                .andExpect(jsonPath("$.message").value("Tạo link thanh toán thành công"));

        // Verify DB
        List<Payment> payments = paymentRepository.findAll();
        assertEquals(1, payments.size());
        assertEquals(PaymentStatus.PENDING, payments.get(0).getStatus());
    }

    // --- TEST 2: VNPAY CALLBACK (XỬ LÝ KẾT QUẢ TRẢ VỀ) ---

    @Test
    void handleVnPayCallback_Success() throws Exception {
        // 1. Setup Payment PENDING
        Payment payment = Payment.builder()
                .userId(user.getId())
                .planId(plan.getId())
                .amount(plan.getPrice())
                .status(PaymentStatus.PENDING)
                .paymentMethod("VNPay")
                .build();
        payment = paymentRepository.save(payment);

        // 2. Chuẩn bị Params giả lập từ VNPay
        long amountInVnPayFormat = plan.getPrice().multiply(new BigDecimal(100)).longValue();

        Map<String, String> params = new HashMap<>();
        params.put("vnp_Amount", String.valueOf(amountInVnPayFormat));
        params.put("vnp_BankCode", "NCB");
        params.put("vnp_OrderInfo", "Thanh toan");
        params.put("vnp_ResponseCode", "00"); // Thành công
        params.put("vnp_TransactionNo", "12345678");
        params.put("vnp_TxnRef", String.valueOf(payment.getId()));

        // --- SỬ DỤNG VNPAY UTIL ĐỂ TẠO HASH ---
        // hashAllFields sẽ tự sắp xếp và nối chuỗi theo đúng chuẩn VNPay
        String hashData = VnPayUtil.hashAllFields(params);
        String secureHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);

        params.put("vnp_SecureHash", secureHash);

        // 3. Gọi API
        var requestBuilder = get("/api/payment/vnpay-callback");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            requestBuilder.param(entry.getKey(), entry.getValue());
        }

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rspCode").value("00"))
                .andExpect(jsonPath("$.message").value("Confirm Success"));

        // 4. Verify DB
        Payment updatedPayment = paymentRepository.findById(payment.getId()).orElseThrow();
        assertEquals(PaymentStatus.SUCCESS, updatedPayment.getStatus());
        assertEquals("12345678", updatedPayment.getTransactionId());

        verify(userSubscriptionService, times(1)).activateSubscription(any(Payment.class));
    }

    @Test
    void handleVnPayCallback_InvalidChecksum_Fail() throws Exception {
        mockMvc.perform(get("/api/payment/vnpay-callback")
                        .param("vnp_SecureHash", "WRONG_HASH_VALUE")
                        .param("vnp_TxnRef", "1")
                        .param("vnp_Amount", "10000000"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.rspCode").value("97")) // Invalid Checksum
                .andExpect(jsonPath("$.message").value("Invalid Checksum"));
    }

    @Test
    void handleVnPayCallback_PaymentFailed_FromVnPay() throws Exception {
        // Setup Payment
        Payment payment = Payment.builder()
                .userId(user.getId())
                .planId(plan.getId())
                .amount(plan.getPrice())
                .status(PaymentStatus.PENDING)
                .build();
        payment = paymentRepository.save(payment);

        // Giả lập VNPay trả về mã lỗi 24 (Hủy giao dịch)
        long amountInVnPayFormat = plan.getPrice().multiply(new BigDecimal(100)).longValue();
        Map<String, String> params = new HashMap<>();
        params.put("vnp_Amount", String.valueOf(amountInVnPayFormat));
        params.put("vnp_ResponseCode", "24"); // Lỗi
        params.put("vnp_TxnRef", String.valueOf(payment.getId()));

        // Hash bằng Util
        String hashData = VnPayUtil.hashAllFields(params);
        String secureHash = VnPayUtil.hmacSHA512(vnPayConfig.getHashSecret(), hashData);
        params.put("vnp_SecureHash", secureHash);

        var requestBuilder = get("/api/payment/vnpay-callback");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            requestBuilder.param(entry.getKey(), entry.getValue());
        }

        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk()); // Controller vẫn trả 200 cho VNPay

        // DB phải là FAILED
        Payment failedPayment = paymentRepository.findById(payment.getId()).orElseThrow();
        assertEquals(PaymentStatus.FAILED, failedPayment.getStatus());
    }
}