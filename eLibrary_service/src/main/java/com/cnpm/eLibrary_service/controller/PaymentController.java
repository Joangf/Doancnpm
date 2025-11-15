package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.CreatePaymentResponse;
import com.cnpm.eLibrary_service.dto.response.VnPayCallbackResponse;
import com.cnpm.eLibrary_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    /**
     * Endpoint này để Frontend gọi khi người dùng bấm nút "Đăng ký gói".
     * Nó thay thế cho /api/subscriptions/subscribe.
     */
    @PostMapping("/create-payment")
    public ApiResponse<CreatePaymentResponse> createPayment(
            @Valid @RequestBody CreatePaymentRequest request,
            @AuthenticationPrincipal Principal principal, // Lấy Principal (user) từ Security Context
            HttpServletRequest httpReq) {


        String username = principal.getName();


        CreatePaymentResponse response = paymentService.createSubscriptionPayment(
                request, username, httpReq);

        return ApiResponse.<CreatePaymentResponse>builder()
                .message("Tạo link thanh toán thành công")
                .result(response)
                .build();
    }
    /**
     * Endpoint này là IPN (Instant Payment Notification)
     * Chỉ VNPay được gọi vào đây (server-to-server)
     * Nó trả về JSON thô cho VNPay, không dùng ApiResponse.
     */
    @GetMapping("/vnpay-callback")
    public ResponseEntity<VnPayCallbackResponse> handleVnPayCallback(HttpServletRequest request) {
        VnPayCallbackResponse response = paymentService.handleVnPayCallback(request);
        return ResponseEntity.ok(response);
    }
}