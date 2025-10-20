package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.EmailVerificationRequest;
import com.cnpm.eLibrary_service.dto.request.GetOtpTtlRequest;
import com.cnpm.eLibrary_service.dto.response.EmailVerificationResponse;
import com.cnpm.eLibrary_service.dto.response.GetOtpTtlResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.RedisService;
import com.cnpm.eLibrary_service.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class VerificationServiceImpl implements VerificationService {
    private final RedisService redisService;
    private final MailService mailService;
    private final UserRepository userRepository;

    @Override
    public void sendVerificationOtp(String email) {
        String otp = generateOtp();
        String subject = "Xác thực tài khoản eLibrary";
        String body = "Xin chào,\n\nMã OTP của bạn là: " + otp
                + "\nMã này sẽ hết hạn sau 5 phút.\n\nTrân trọng,\neLibrary Team";
        mailService.sendEmail(email, subject, body);
        redisService.setValue("otp:" + email, otp, 5L, TimeUnit.MINUTES);
    }

    @Override
    public EmailVerificationResponse verifyEmail(EmailVerificationRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp();
        String cachedOtp = redisService.getValue("otp:" + email);

        if(cachedOtp == null || !cachedOtp.equals(otp))
            throw new AppException(ErrorCode.INVALID_OTP);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_EMAIL_NOT_EXISTED));
        user.setVerified(true);
        userRepository.save(user);

        redisService.deleteValue("otp:" + email);

        return EmailVerificationResponse.builder()
                .verify(true)
                .build();

    }

    @Override
    public GetOtpTtlResponse getOtpTtl(GetOtpTtlRequest request) {
        Long ttl = redisService.getTtl("otp:" + request.getEmail(), TimeUnit.SECONDS);
        if (ttl == null || ttl <= 0) {
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }
        return GetOtpTtlResponse.builder()
                .Ttl(ttl)
                .build();
    }


    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }
}
