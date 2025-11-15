package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.CreatePaymentResponse;
import com.cnpm.eLibrary_service.dto.response.VnPayCallbackResponse;
import com.cnpm.eLibrary_service.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@Slf4j
@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-payment")
    public ApiResponse<CreatePaymentResponse> createPayment(
            @Valid @RequestBody CreatePaymentRequest request,
            @AuthenticationPrincipal Jwt jwt,
            HttpServletRequest httpReq) {

        String username = jwt.getSubject();

        CreatePaymentResponse response = paymentService.createSubscriptionPayment(
                request, username, httpReq);

        return ApiResponse.<CreatePaymentResponse>builder()
                .message("Tạo link thanh toán thành công")
                .result(response)
                .build();
    }

    @GetMapping("/vnpay-callback")
    public ResponseEntity<VnPayCallbackResponse> handleVnPayCallback(HttpServletRequest request) {

        VnPayCallbackResponse response = paymentService.handleVnPayCallback(request);
        return ResponseEntity.ok(response);
    }
}