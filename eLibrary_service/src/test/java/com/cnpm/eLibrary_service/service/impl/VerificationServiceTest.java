package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.EmailVerificationRequest;
import com.cnpm.eLibrary_service.dto.request.GetOtpTtlRequest;
import com.cnpm.eLibrary_service.dto.response.EmailVerificationResponse;
import com.cnpm.eLibrary_service.dto.response.GetOtpTtlResponse;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.RedisService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VerificationServiceTest {

    @Mock
    private RedisService redisService;

    @Mock
    private MailService mailService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private VerificationServiceImpl verificationService;

    @Test
    void sendVerificationOtp_Success() {
        String email = "test@example.com";

        verificationService.sendVerificationOtp(email);

        // Verify gửi mail
        verify(mailService, times(1)).sendEmail(eq(email), anyString(), contains("Mã OTP của bạn là:"));

        // Verify lưu OTP vào Redis (Value là random nên dùng anyString())
        verify(redisService, times(1)).setValue(eq("otp:" + email), anyString(), eq(5L), eq(TimeUnit.MINUTES));
    }

    @Test
    void verifyEmail_Success() {
        EmailVerificationRequest request = new EmailVerificationRequest("test@example.com", "123456");
        User user = User.builder().email("test@example.com").isVerified(false).build();

        // Mock Redis trả về đúng OTP
        when(redisService.getValue("otp:test@example.com")).thenReturn("123456");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        EmailVerificationResponse response = verificationService.verifyEmail(request);

        assertTrue(response.isVerify());
        assertTrue(user.isVerified()); // User phải được set verified = true
        verify(userRepository, times(1)).save(user);
        verify(redisService, times(1)).deleteValue("otp:test@example.com"); // OTP phải bị xóa sau khi dùng
    }

    @Test
    void verifyEmail_InvalidOtp_Fail() {
        EmailVerificationRequest request = new EmailVerificationRequest("test@example.com", "123456");

        // Case 1: Redis trả về null (hết hạn hoặc chưa gửi)
        when(redisService.getValue("otp:test@example.com")).thenReturn(null);
        AppException ex1 = assertThrows(AppException.class, () -> verificationService.verifyEmail(request));
        assertEquals(ErrorCode.INVALID_OTP, ex1.getErrorCode());

        // Case 2: Redis trả về OTP khác (nhập sai)
        when(redisService.getValue("otp:test@example.com")).thenReturn("654321");
        AppException ex2 = assertThrows(AppException.class, () -> verificationService.verifyEmail(request));
        assertEquals(ErrorCode.INVALID_OTP, ex2.getErrorCode());
    }

    @Test
    void verifyEmail_UserNotFound_Fail() {
        EmailVerificationRequest request = new EmailVerificationRequest("test@example.com", "123456");

        when(redisService.getValue("otp:test@example.com")).thenReturn("123456");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> verificationService.verifyEmail(request));
        assertEquals(ErrorCode.USER_EMAIL_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void getOtpTtl_Success() {
        GetOtpTtlRequest request = new GetOtpTtlRequest("test@example.com");
        when(redisService.getTtl("otp:test@example.com", TimeUnit.SECONDS)).thenReturn(120L);

        GetOtpTtlResponse response = verificationService.getOtpTtl(request);

        assertEquals(120L, response.getTtl());
    }

    @Test
    void getOtpTtl_ExpiredOrNotExisted_Fail() {
        GetOtpTtlRequest request = new GetOtpTtlRequest("test@example.com");

        // Case 1: TTL = -2 (Key không tồn tại) hoặc -1 (Không có expire)
        when(redisService.getTtl("otp:test@example.com", TimeUnit.SECONDS)).thenReturn(-2L);

        AppException ex = assertThrows(AppException.class, () -> verificationService.getOtpTtl(request));
        assertEquals(ErrorCode.OTP_EXPIRED, ex.getErrorCode());
    }
}