package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.ResendEmailRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateEmailRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.UserResponse;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.UserMapper;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private VerificationServiceImpl verificationService;
    @Mock
    private SubscriptionPlanRepository planRepository;
    @Mock
    private UserSubscriptionRepository userSubscriptionRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;
    private CreateUserRequest createRequest;
    private UserResponse userResponse;
    private SubscriptionPlan basicPlan;

    @BeforeEach
    void setup() {
        user = User.builder()
                .id("user-id-123")
                .username("testuser")
                .email("test@example.com")
                .password("encoded_password")
                .isVerified(false)
                .build();

        createRequest = CreateUserRequest.builder()
                .username("testuser")
                .password("password123")
                .email("test@example.com")
                .firstName("John")
                .lastName("Doe")
                .build();

        userResponse = UserResponse.builder()
                .id("user-id-123")
                .username("testuser")
                .email("test@example.com")
                .build();

        basicPlan = SubscriptionPlan.builder()
                .name("BASIC")
                .duration(30)
                .build();
    }

    // --- 1. TEST CREATE USER ---

    @Test
    void createUser_Success() {
        // GIVEN
        when(userRepository.existsByUsername(createRequest.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(createRequest.getEmail())).thenReturn(false);
        when(userMapper.toUser(createRequest)).thenReturn(user);
        when(passwordEncoder.encode(createRequest.getPassword())).thenReturn("encoded_password");
        when(planRepository.findByName("BASIC")).thenReturn(Optional.of(basicPlan));
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        // WHEN
        UserResponse result = userService.createUser(createRequest);

        // THEN
        assertNotNull(result);
        assertEquals("testuser", result.getUsername());

        // Verify logic phụ quan trọng
        verify(userRepository, times(1)).save(user); // Phải lưu user
        verify(userSubscriptionRepository, times(1)).save(any(UserSubscription.class)); // Phải tạo gói subscription
        verify(verificationService, times(1)).sendVerificationOtp(user.getEmail()); // Phải gửi OTP
    }

    @Test
    void createUser_UsernameExisted_Fail() {
        when(userRepository.existsByUsername(createRequest.getUsername())).thenReturn(true);

        AppException exception = assertThrows(AppException.class,
                () -> userService.createUser(createRequest));

        assertEquals(ErrorCode.USERNAME_EXISTED, exception.getErrorCode());
    }

    @Test
    void createUser_EmailExisted_Fail() {
        when(userRepository.existsByUsername(createRequest.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(createRequest.getEmail())).thenReturn(true);

        AppException exception = assertThrows(AppException.class,
                () -> userService.createUser(createRequest));

        assertEquals(ErrorCode.EMAIL_EXISTED, exception.getErrorCode());
    }

    // --- 2. TEST GET USER INFO ---

    @Test
    void getUserInfo_Success() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        UserResponse result = userService.getUserInfo("user-id-123");

        assertEquals("testuser", result.getUsername());
    }

    @Test
    void getUserInfo_NotFound_Fail() {
        when(userRepository.findById("invalid-id")).thenReturn(Optional.empty());

        AppException exception = assertThrows(AppException.class,
                () -> userService.getUserInfo("invalid-id"));

        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, exception.getErrorCode());
    }

    // --- 3. TEST GET MY INFO (Mock SecurityContext) ---

    @Test
    void getMyInfo_Success() {
        // Mock Security Context để giả lập user đang đăng nhập
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser"); // User đang login là testuser
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        // WHEN
        UserResponse result = userService.getMyInfo();

        // THEN
        assertEquals("testuser", result.getUsername());
    }

    // --- 4. TEST UPDATE USER ---

    @Test
    void updateUser_Success() {
        UpdateUserRequest updateRequest = UpdateUserRequest.builder()
                .firstName("Jane")
                .build();

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));

        // Giả lập mapper update vào entity
        doAnswer(invocation -> {
            User u = invocation.getArgument(1);
            u.setFirstName("Jane");
            return null;
        }).when(userMapper).updateUser(updateRequest, user);

        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        UserResponse result = userService.updateUser("user-id-123", updateRequest);

        verify(userRepository, times(1)).save(user);
    }

    // --- 5. TEST UPDATE EMAIL BEFORE VERIFICATION ---

    @Test
    void updateEmailBeforeVerification_Success() {
        UpdateEmailRequest emailRequest = new UpdateEmailRequest("newemail@example.com");
        user.setVerified(false); // User chưa verify mới được đổi

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail("newemail@example.com")).thenReturn(false); // Email mới chưa trùng
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);

        // WHEN
        userService.updateEmailBeforeVerification("user-id-123", emailRequest);

        // THEN
        assertEquals("newemail@example.com", user.getEmail());
        // Quan trọng: Phải gửi lại OTP cho mail mới
        verify(verificationService, times(1)).sendVerificationOtp("newemail@example.com");
    }

    @Test
    void updateEmail_AlreadyVerified_Fail() {
        UpdateEmailRequest emailRequest = new UpdateEmailRequest("new@example.com");
        user.setVerified(true); // Đã verify rồi

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));

        AppException ex = assertThrows(AppException.class,
                () -> userService.updateEmailBeforeVerification("user-id-123", emailRequest));

        assertEquals(ErrorCode.CANNOT_CHANGE_EMAIL_AFTER_VERIFICATION, ex.getErrorCode());
    }

    @Test
    void updateEmail_EmailDuplicated_Fail() {
        UpdateEmailRequest emailRequest = new UpdateEmailRequest("exist@example.com");
        user.setVerified(false);

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail("exist@example.com")).thenReturn(true); // Email trùng

        AppException ex = assertThrows(AppException.class,
                () -> userService.updateEmailBeforeVerification("user-id-123", emailRequest));

        assertEquals(ErrorCode.EMAIL_EXISTED, ex.getErrorCode());
    }

    // --- 6. TEST RESEND VERIFICATION OTP ---

    @Test
    void resendVerificationOtp_Success() {
        ResendEmailRequest request = new ResendEmailRequest("test@example.com");
        user.setVerified(false);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        userService.resendVerificationOtp(request);

        verify(verificationService, times(1)).sendVerificationOtp("test@example.com");
    }

    @Test
    void resendVerificationOtp_AlreadyVerified_Fail() {
        ResendEmailRequest request = new ResendEmailRequest("test@example.com");
        user.setVerified(true);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        AppException ex = assertThrows(AppException.class,
                () -> userService.resendVerificationOtp(request));

        assertEquals(ErrorCode.ALREADY_VERIFIED, ex.getErrorCode());
    }

    // --- 7. TEST DELETE & GET ALL ---

    @Test
    void deleteUser_Success() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));

        userService.deleteUser("user-id-123");

        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void getAllUsers_Success() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> userPage = new PageImpl<>(List.of(user));

        when(userRepository.findAll(pageable)).thenReturn(userPage);
        when(userMapper.toUserResponse(any(User.class))).thenReturn(userResponse);

        Page<UserResponse> result = userService.getAllUsers(0, 10);

        assertEquals(1, result.getTotalElements());
    }
}