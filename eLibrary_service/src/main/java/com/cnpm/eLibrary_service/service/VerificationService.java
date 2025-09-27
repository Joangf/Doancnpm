package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.EmailVerificationRequest;
import com.cnpm.eLibrary_service.dto.request.GetOtpTtlRequest;
import com.cnpm.eLibrary_service.dto.response.EmailVerificationResponse;
import com.cnpm.eLibrary_service.dto.response.GetOtpTtlResponse;

public interface VerificationService {
    void sendVerificationOtp(String email);
    EmailVerificationResponse verifyEmail(EmailVerificationRequest request);

    GetOtpTtlResponse getOtpTtl(GetOtpTtlRequest request);
}
