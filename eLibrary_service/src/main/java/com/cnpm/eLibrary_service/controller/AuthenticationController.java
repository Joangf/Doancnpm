package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.*;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.AuthenticationResponse;
import com.cnpm.eLibrary_service.dto.response.IntrospectResponse;
import com.cnpm.eLibrary_service.dto.response.ResetPasswordResponse;
import com.cnpm.eLibrary_service.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.login(request))
                .build();
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(@RequestBody LogoutRequest request) throws Exception {
        authenticationService.logout(request);
        return ApiResponse.<String>builder()
                .result("Logout thành công")
                .build();
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshTokenRequest request) throws Exception {
        return ApiResponse.<AuthenticationResponse>builder()
                .result(authenticationService.refreshToken(request))
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws Exception {
        return ApiResponse.<IntrospectResponse>builder()
                .result(authenticationService.introspect(request))
                .build();
    }

    @PostMapping("/forgot-password")
    public ApiResponse<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authenticationService.forgotPassword(request);
        return ApiResponse.<String>builder()
                .result("Email reset mật khẩu đã được gửi (nếu email tồn tại)")
                .build();
    }

    @PostMapping("/reset-password")
    public ApiResponse<ResetPasswordResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        return ApiResponse.<ResetPasswordResponse>builder()
                .result(authenticationService.resetPassword(request))
                .build();
    }
}
