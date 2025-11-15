package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.CreatePaymentRequest;
import com.cnpm.eLibrary_service.dto.response.CreatePaymentResponse;
import com.cnpm.eLibrary_service.dto.response.VnPayCallbackResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface PaymentService {
    CreatePaymentResponse createSubscriptionPayment(CreatePaymentRequest request, String username, HttpServletRequest httpReq);

    VnPayCallbackResponse handleVnPayCallback(HttpServletRequest request);
}
