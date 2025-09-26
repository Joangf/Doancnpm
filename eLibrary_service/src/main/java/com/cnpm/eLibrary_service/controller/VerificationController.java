package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.EmailVerificationRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.EmailVerificationResponse;
import com.cnpm.eLibrary_service.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/verify")
public class VerificationController {
    private final VerificationService verificationService;

    @PostMapping("/email")
    public ApiResponse<EmailVerificationResponse> verifyEmail(@RequestBody EmailVerificationRequest request){
        return ApiResponse.<EmailVerificationResponse>builder()
                .result(verificationService.verifyEmail(request))
                .build();
    }
}
