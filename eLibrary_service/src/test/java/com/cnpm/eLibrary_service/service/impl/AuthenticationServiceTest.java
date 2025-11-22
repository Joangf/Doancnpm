package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.*;
import com.cnpm.eLibrary_service.dto.response.AuthenticationResponse;
import com.cnpm.eLibrary_service.dto.response.IntrospectResponse;
import com.cnpm.eLibrary_service.dto.response.ResetPasswordResponse;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.entity.enums.Role;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import com.cnpm.eLibrary_service.service.RedisService;
import com.cnpm.eLibrary_service.service.VerificationService;
import com.cnpm.eLibrary_service.service.MailService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private RedisService redisService;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private VerificationService verificationService;
    @Mock private SubscriptionPlanRepository planRepository;
    @Mock private UserSubscriptionRepository userSubscriptionRepository;
    @Mock private MailService mailService;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    private User user;
    private SubscriptionPlan basicPlan;
    // Key giả lập phải đủ dài (64 ký tự - 512 bits)
    private final String SIGNER_KEY = "1234567890123456789012345678901234567890123456789012345678901234";

    @BeforeEach
    void setup() {
        // Inject các giá trị @Value thủ công
        ReflectionTestUtils.setField(authenticationService, "SECRET_KEY", SIGNER_KEY);
        ReflectionTestUtils.setField(authenticationService, "VALID_DURATION", 3600L);
        ReflectionTestUtils.setField(authenticationService, "REFRESHABLE_DURATION", 7200L);
        ReflectionTestUtils.setField(authenticationService, "frontendBaseUrl", "http://localhost:3000");

        user = User.builder()
                .id("user-id-001")
                .username("testuser")
                .email("test@example.com")
                .password("encoded_password")
                .role(Role.USER)
                .firstName("John")
                .lastName("Doe")
                .isVerified(true)
                .build();

        basicPlan = SubscriptionPlan.builder()
                .id(1L)
                .name("BASIC")
                .maxBorrowNumbers(3)
                .maxBorrowDays(14)
                .duration(30) // days
                .price(BigDecimal.valueOf(0)) // miễn phí
                .build();
    }

    // --- 1. TEST LOGIN ---
    @Test
    void login_Success() {
        LoginRequest request = new LoginRequest("testuser", "password123");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "encoded_password")).thenReturn(true);

        AuthenticationResponse response = authenticationService.login(request);

        assertTrue(response.isAuthenticated());
        assertNotNull(response.getToken());
        assertEquals("testuser", response.getUsername());
    }

    @Test
    void login_UserNotFound_Fail() {
        LoginRequest request = new LoginRequest("non_exist_user", "password123");
        when(userRepository.findByUsername("non_exist_user")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("non_exist_user")).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class, () -> authenticationService.login(request));
        assertEquals(ErrorCode.USER_NOT_FOUND, exception.getErrorCode());
    }

    @Test
    void login_WrongPassword_Fail() {
        LoginRequest request = new LoginRequest("testuser", "wrong_password");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong_password", "encoded_password")).thenReturn(false);

        AppException exception = assertThrows(AppException.class, () -> authenticationService.login(request));
        assertEquals(ErrorCode.UNAUTHENTICATED, exception.getErrorCode());
    }

    @Test
    void login_UserNotVerified_Fail() {
        user.setVerified(false);
        LoginRequest request = new LoginRequest("testuser", "password123");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "encoded_password")).thenReturn(true);
        when(redisService.getValue(anyString())).thenReturn(null);

        AppException exception = assertThrows(AppException.class, () -> authenticationService.login(request));
        assertEquals(ErrorCode.USER_NOT_VERIFIED, exception.getErrorCode());
        verify(verificationService, times(1)).sendVerificationOtp(user.getEmail());
    }

    // --- 2. TEST OAUTH REGISTER ---
    @Test
    void completeOAuthRegister_Success() {
        CreateUserRequest request = CreateUserRequest.builder()
                .email("test@example.com")
                .username("new_oauth_user")
                .password("password123")
                .firstName("New")
                .lastName("User")
                .role(Role.USER)
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("new_oauth_user")).thenReturn(false);
        when(planRepository.findByName("BASIC")).thenReturn(Optional.of(basicPlan));
        when(passwordEncoder.encode("password123")).thenReturn("encoded_new_pass");

        AuthenticationResponse response = authenticationService.completeOAuthRegister(request);

        assertNotNull(response.getToken());
        assertEquals("new_oauth_user", user.getUsername()); // Verify user entity updated
        verify(userRepository, times(1)).save(user);
        verify(userSubscriptionRepository, times(1)).save(any(UserSubscription.class));
    }

    @Test
    void completeOAuthRegister_EmailNotFound_Fail() {
        CreateUserRequest request = CreateUserRequest.builder().email("notfound@email.com").build();
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> authenticationService.completeOAuthRegister(request));
        assertEquals(ErrorCode.USER_EMAIL_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void completeOAuthRegister_UsernameExisted_Fail() {
        CreateUserRequest request = CreateUserRequest.builder()
                .email("test@example.com")
                .username("existing_user")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(userRepository.existsByUsername("existing_user")).thenReturn(true);

        AppException ex = assertThrows(AppException.class, () -> authenticationService.completeOAuthRegister(request));
        assertEquals(ErrorCode.USERNAME_EXISTED, ex.getErrorCode());
    }

    // --- 3. TEST INTROSPECT ---
    @Test
    void introspect_ValidToken_Success() {
        String validToken = authenticationService.generateToken(user);
        IntrospectRequest request = IntrospectRequest.builder().token(validToken).build();
        IntrospectResponse response = authenticationService.introspect(request);
        assertTrue(response.isValid());
    }

    @Test
    void introspect_ExpiredToken_Fail() throws JOSEException {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject("testuser")
                .issueTime(new Date(Instant.now().minus(2, ChronoUnit.HOURS).toEpochMilli()))
                .expirationTime(new Date(Instant.now().minus(1, ChronoUnit.HOURS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .build();
        Payload payload = new Payload(claims.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        jwsObject.sign(new MACSigner(SIGNER_KEY));
        String expiredToken = jwsObject.serialize();

        IntrospectRequest request = IntrospectRequest.builder().token(expiredToken).build();
        IntrospectResponse response = authenticationService.introspect(request);
        assertFalse(response.isValid());
    }

    @Test
    void introspect_InvalidFormatToken_Fail() {
        IntrospectRequest request = IntrospectRequest.builder().token("invalid-token").build();
        IntrospectResponse response = authenticationService.introspect(request);
        assertFalse(response.isValid());
    }

    // --- 4. TEST LOGOUT ---
    @Test
    void logout_Success() throws ParseException, JOSEException {
        String token = authenticationService.generateToken(user);
        LogoutRequest request = LogoutRequest.builder().token(token).build();
        SignedJWT signedJWT = SignedJWT.parse(token);
        String jti = signedJWT.getJWTClaimsSet().getJWTID();

        authenticationService.logout(request);

        verify(redisService, times(1)).setValue(eq(jti), eq(token), anyLong(), eq(TimeUnit.SECONDS));
    }

    @Test
    void logout_AlreadyInvalidToken_Success() throws ParseException, JOSEException {
        // Token rác -> introspect fail -> catch exception -> log -> không gọi redis
        LogoutRequest request = LogoutRequest.builder().token("invalid.token").build();
        authenticationService.logout(request);
        verify(redisService, never()).setValue(anyString(), anyString(), anyLong(), any());
    }

    @Test
    void logout_TokenAlreadyLoggedOut_Fail() throws ParseException, JOSEException {
        String token = authenticationService.generateToken(user);
        LogoutRequest request = LogoutRequest.builder().token(token).build();
        SignedJWT signedJWT = SignedJWT.parse(token);
        String jti = signedJWT.getJWTClaimsSet().getJWTID();

        // Lần 1: Logout thành công
        authenticationService.logout(request);
        verify(redisService, times(1)).setValue(eq(jti), eq(token), anyLong(), any());

        // Lần 2: Giả lập Redis đã có token (đã logout)
        when(redisService.getValue(jti)).thenReturn(token);
        authenticationService.logout(request);

        // Verify: Redis không được gọi setValue thêm lần nào nữa
        verify(redisService, times(1)).setValue(anyString(), anyString(), anyLong(), any());
    }


    // --- 5. TEST REFRESH TOKEN ---
    @Test
    void refreshToken_Success() throws ParseException, JOSEException {
        String token = authenticationService.generateToken(user);
        RefreshTokenRequest request = RefreshTokenRequest.builder().token(token).build();
        SignedJWT signedJWT = SignedJWT.parse(token);
        String jti = signedJWT.getJWTClaimsSet().getJWTID();

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        AuthenticationResponse response = authenticationService.refreshToken(request);

        // 1. Token cũ phải bị đưa vào blacklist
        verify(redisService, times(1)).setValue(eq(jti), eq(token), anyLong(), eq(TimeUnit.SECONDS));
        // 2. Token mới phải được trả về
        assertNotNull(response.getToken());
        assertNotEquals(token, response.getToken()); // Token mới phải khác token cũ
        assertTrue(response.isAuthenticated());
    }

    @Test
    void refreshToken_TokenExpired_Fail() throws JOSEException {
        // Tạo token hết hạn
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claims = new JWTClaimsSet.Builder()
                .subject("testuser")
                .issueTime(new Date(Instant.now().minus(10, ChronoUnit.DAYS).toEpochMilli()))
                // Hết hạn quá thời gian refresh (REFRESHABLE_DURATION = 7200s ~ 2h)
                .expirationTime(new Date(Instant.now().minus(5, ChronoUnit.DAYS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .build();
        JWSObject jwsObject = new JWSObject(header, new Payload(claims.toJSONObject()));
        jwsObject.sign(new MACSigner(SIGNER_KEY));
        String oldToken = jwsObject.serialize();

        RefreshTokenRequest request = RefreshTokenRequest.builder().token(oldToken).build();

        AppException ex = assertThrows(AppException.class, () -> authenticationService.refreshToken(request));
        assertEquals(ErrorCode.UNAUTHENTICATED, ex.getErrorCode());
    }


    // --- 6. TEST FORGOT PASSWORD ---
    @Test
    void forgotPassword_Success() {
        ForgotPasswordRequest request = new ForgotPasswordRequest("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        authenticationService.forgotPassword(request);

        // Verify lưu token vào Redis
        verify(redisService, times(1)).setValue(startsWith("RESET:"), eq("testuser"), eq(5L), eq(TimeUnit.MINUTES));
        // Verify gửi mail
        verify(mailService, times(1)).sendEmail(eq("test@example.com"), anyString(), anyString());
    }

    @Test
    void forgotPassword_EmailNotFound_Fail() {
        ForgotPasswordRequest request = new ForgotPasswordRequest("notfound@example.com");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> authenticationService.forgotPassword(request));
        assertEquals(ErrorCode.USER_EMAIL_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void forgotPasswordWithLink_Success() {
        ForgotPasswordRequest request = new ForgotPasswordRequest("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        authenticationService.forgotPasswordWithLink(request);

        verify(redisService, times(1)).setValue(startsWith("RESET:"), eq("testuser"), eq(5L), eq(TimeUnit.MINUTES));
        // Verify nội dung mail có chứa link
        verify(mailService, times(1)).sendEmail(eq("test@example.com"), anyString(), contains("http://localhost:3000/reset-password?token="));
    }

    // --- 7. TEST RESET PASSWORD ---
    @Test
    void resetPassword_Success() {
        String resetToken = "sample-reset-token";
        ResetPasswordRequest request = new ResetPasswordRequest(resetToken, "newPassword123");

        when(redisService.getValue("RESET:" + resetToken)).thenReturn("testuser");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(passwordEncoder.encode("newPassword123")).thenReturn("encoded_new_pass");

        ResetPasswordResponse response = authenticationService.resetPassword(request);

        assertEquals("testuser", response.getUsername());
        verify(userRepository, times(1)).save(user); // User phải được lưu
        verify(redisService, times(1)).deleteValue("RESET:" + resetToken); // Token phải bị xóa sau khi dùng
    }

    @Test
    void resetPassword_InvalidToken_Fail() {
        ResetPasswordRequest request = new ResetPasswordRequest("invalid-token", "newPass");
        when(redisService.getValue("RESET:invalid-token")).thenReturn(null);

        AppException ex = assertThrows(AppException.class, () -> authenticationService.resetPassword(request));
        assertEquals(ErrorCode.INVALID_OR_EXPIRED_TOKEN, ex.getErrorCode());
    }
}