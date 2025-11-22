package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.configuration.VnPayConfig;
import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.dto.response.CreatePaymentResponse;
import com.cnpm.eLibrary_service.dto.response.VnPayCallbackResponse;
import com.cnpm.eLibrary_service.entity.Payment;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.enums.PaymentStatus;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.PaymentRepository;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import com.cnpm.eLibrary_service.util.VnPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock private VnPayConfig vnPayConfig;
    @Mock private PaymentRepository paymentRepository;
    @Mock private UserRepository userRepository;
    @Mock private SubscriptionPlanRepository planRepository;
    @Mock private UserSubscriptionService userSubscriptionService;
    @Mock private HttpServletRequest httpServletRequest;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private User user;
    private SubscriptionPlan plan;
    private Payment payment;

    @BeforeEach
    void setup() {
        user = User.builder().id("user-id").username("testuser").build();
        plan = SubscriptionPlan.builder().id(1L).name("BASIC").price(BigDecimal.valueOf(100000L)).build();
        payment = Payment.builder()
                .id(123L)
                .userId("user-id")
                .planId(1L)
                .amount(BigDecimal.valueOf(100000L))
                .status(PaymentStatus.PENDING)
                .build();
    }

    // --- 1. TEST CREATE SUBSCRIPTION PAYMENT (Tạo URL thanh toán) ---

    @Test
    void createSubscriptionPayment_Success() {
        CreatePaymentRequest request = new CreatePaymentRequest();
        request.setPlanId(1L);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        // Config Mock cho VNPayConfig
        when(vnPayConfig.getTmnCode()).thenReturn("TMNCODE");
        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");
        when(vnPayConfig.getReturnUrl()).thenReturn("http://return.url");
        when(vnPayConfig.getUrl()).thenReturn("http://vnpay.url");

        // QUAN TRỌNG: Mock Static Method của VnPayUtil
        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.getIpAddress(httpServletRequest)).thenReturn("127.0.0.1");
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("hashedData");
            utilities.when(() -> VnPayUtil.hmacSHA512(anyString(), anyString())).thenReturn("secureHash");

            // WHEN
            CreatePaymentResponse response = paymentService.createSubscriptionPayment(request, "testuser", httpServletRequest);

            // THEN
            assertNotNull(response);
            assertTrue(response.getPaymentUrl().contains("http://vnpay.url"));
            assertTrue(response.getPaymentUrl().contains("vnp_SecureHash=secureHash"));
            verify(paymentRepository, times(1)).save(any(Payment.class));
        }
    }

    @Test
    void createSubscriptionPayment_UserNotFound_Fail() {
        CreatePaymentRequest request = new CreatePaymentRequest();
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> paymentService.createSubscriptionPayment(request, "testuser", httpServletRequest));
        assertEquals(ErrorCode.USERNAME_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 2. TEST HANDLE CALLBACK (Xử lý kết quả trả về) ---

    @Test
    void handleVnPayCallback_Success() {
        // Mock params từ request gửi về
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of(
                "vnp_SecureHash", "vnp_TxnRef", "vnp_Amount", "vnp_ResponseCode", "vnp_TransactionNo"
        )));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("validHash");
        when(httpServletRequest.getParameter("vnp_TxnRef")).thenReturn("123");
        when(httpServletRequest.getParameter("vnp_Amount")).thenReturn("10000000"); // 100k * 100
        when(httpServletRequest.getParameter("vnp_ResponseCode")).thenReturn("00");
        when(httpServletRequest.getParameter("vnp_TransactionNo")).thenReturn("TXN123");

        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");
        when(paymentRepository.findById(123L)).thenReturn(Optional.of(payment));

        // Mock Static: Giả lập hash tính toán ra GIỐNG HỆT hash gửi về
        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("validHash");

            // WHEN
            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            // THEN
            assertEquals("00", response.getRspCode());
            assertEquals(PaymentStatus.SUCCESS, payment.getStatus());
            verify(userSubscriptionService, times(1)).activateSubscription(payment);
            verify(paymentRepository, times(1)).save(payment);
        }
    }

    @Test
    void handleVnPayCallback_InvalidChecksum_Fail() {
        // Mock params
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of("vnp_SecureHash")));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("fakeHash");
        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");

        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            // Hash tính ra KHÁC với hash gửi về
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("calculatedHash");

            // WHEN
            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            // THEN
            assertEquals("97", response.getRspCode()); // Invalid Checksum
            assertEquals("Invalid Checksum", response.getMessage());
            verify(paymentRepository, never()).save(any());
        }
    }

    @Test
    void handleVnPayCallback_OrderNotFound_Fail() {
        // Setup valid checksum flow
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of("vnp_SecureHash", "vnp_TxnRef")));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("validHash");
        when(httpServletRequest.getParameter("vnp_TxnRef")).thenReturn("999"); // ID ko tồn tại
        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");

        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("validHash");

            // Mock DB return Empty
            when(paymentRepository.findById(999L)).thenReturn(Optional.empty());

            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            assertEquals("01", response.getRspCode()); // Order Not Found
        }
    }

    @Test
    void handleVnPayCallback_InvalidAmount_Fail() {
        // Setup valid checksum flow, valid ID
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of(
                "vnp_SecureHash", "vnp_TxnRef", "vnp_Amount"
        )));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("validHash");
        when(httpServletRequest.getParameter("vnp_TxnRef")).thenReturn("123");
        when(httpServletRequest.getParameter("vnp_Amount")).thenReturn("500000"); // 5k VND (Sai lệch với 100k trong DB)

        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");
        when(paymentRepository.findById(123L)).thenReturn(Optional.of(payment));

        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("validHash");

            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            assertEquals("04", response.getRspCode()); // Invalid Amount
        }
    }

    @Test
    void handleVnPayCallback_PaymentFailedFromVnPay() {
        // Checksum OK, ID OK, Amount OK -> NHƯNG VnPay trả về code lỗi (VD: Hủy thanh toán)
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of(
                "vnp_SecureHash", "vnp_TxnRef", "vnp_Amount", "vnp_ResponseCode"
        )));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("validHash");
        when(httpServletRequest.getParameter("vnp_TxnRef")).thenReturn("123");
        when(httpServletRequest.getParameter("vnp_Amount")).thenReturn("10000000");
        when(httpServletRequest.getParameter("vnp_ResponseCode")).thenReturn("24"); // User hủy

        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");
        when(paymentRepository.findById(123L)).thenReturn(Optional.of(payment));

        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("validHash");

            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            // THEN
            assertEquals("00", response.getRspCode()); // Vẫn trả về 00 để báo VnPay là mình đã nhận tin
            assertEquals(PaymentStatus.FAILED, payment.getStatus()); // Nhưng status trong DB là FAILED
            verify(userSubscriptionService, never()).activateSubscription(any()); // Không kích hoạt gói
        }
    }

    // --- TEST: ORDER ALREADY PROCESSED ---
    @Test
    void handleVnPayCallback_OrderAlreadyProcessed_Fail() {
        // Mock checksum OK, Transaction ID OK
        when(httpServletRequest.getParameterNames()).thenReturn(Collections.enumeration(List.of("vnp_SecureHash", "vnp_TxnRef")));
        when(httpServletRequest.getParameter("vnp_SecureHash")).thenReturn("validHash");
        when(httpServletRequest.getParameter("vnp_TxnRef")).thenReturn("123");
        when(vnPayConfig.getHashSecret()).thenReturn("SECRET");

        // Mock DB trả về payment nhưng status đã là SUCCESS (đã xử lý rồi)
        payment.setStatus(PaymentStatus.SUCCESS);
        when(paymentRepository.findById(123L)).thenReturn(Optional.of(payment));

        try (MockedStatic<VnPayUtil> utilities = mockStatic(VnPayUtil.class)) {
            utilities.when(() -> VnPayUtil.hashAllFields(anyMap())).thenReturn("rawData");
            utilities.when(() -> VnPayUtil.hmacSHA512("SECRET", "rawData")).thenReturn("validHash");

            // WHEN
            VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

            // THEN
            assertEquals("02", response.getRspCode());
            assertEquals("Order Already Processed", response.getMessage());
        }
    }

    // --- TEST: UNKNOWN ERROR ---
    @Test
    void handleVnPayCallback_UnknownError_Fail() {
        // Giả lập lỗi bất ngờ (ví dụ lỗi khi getParameter)
        when(httpServletRequest.getParameterNames()).thenThrow(new RuntimeException("Unexpected DB Error"));

        // WHEN
        VnPayCallbackResponse response = paymentService.handleVnPayCallback(httpServletRequest);

        // THEN
        assertEquals("99", response.getRspCode());
        assertEquals("Unknown Error", response.getMessage());
    }
}