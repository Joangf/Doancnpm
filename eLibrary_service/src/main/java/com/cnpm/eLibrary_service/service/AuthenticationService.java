package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.*;
import com.cnpm.eLibrary_service.dto.response.AuthenticationResponse;
import com.cnpm.eLibrary_service.dto.response.IntrospectResponse;
import com.cnpm.eLibrary_service.dto.response.ResetPasswordResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException;

    AuthenticationResponse login(LoginRequest request);

    void logout(LogoutRequest request)
            throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(RefreshTokenRequest request)
            throws ParseException, JOSEException;
    void forgotPassword(ForgotPasswordRequest request);
    ResetPasswordResponse resetPassword(ResetPasswordRequest request);
}
