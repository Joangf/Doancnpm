package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.SubscribeRequest;
import com.cnpm.eLibrary_service.dto.response.UserSubscriptionResponse;
import com.cnpm.eLibrary_service.entity.Payment;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.UserSubscriptionMapper;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import com.cnpm.eLibrary_service.service.MailService;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserSubscriptionServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private SubscriptionPlanRepository planRepository;
    @Mock private UserSubscriptionRepository subscriptionRepository;
    @Mock private UserSubscriptionMapper subscriptionMapper;
    @Mock private MailService mailService;

    @InjectMocks
    private UserSubscriptionServiceImpl userSubscriptionService;

    private User user;
    private SubscriptionPlan plan;
    private UserSubscription activeSubscription;
    private SubscribeRequest subscribeRequest;
    private UserSubscriptionResponse subscriptionResponse;

    @BeforeEach
    void setup() {
        user = User.builder().id("user-id-123").username("testuser").build();

        plan = SubscriptionPlan.builder()
                .id(1L)
                .name("PREMIUM")
                .price(BigDecimal.valueOf(100000L))
                .duration(30)
                .build();

        activeSubscription = UserSubscription.builder()
                .id(100L)
                .user(user)
                .subscriptionPlan(plan)
                .status(SubscriptionStatus.ACTIVE)
                .startDateTime(LocalDateTime.now().minusDays(5))
                .endDateTime(LocalDateTime.now().plusDays(25))
                .build();

        subscribeRequest = new SubscribeRequest();
        subscribeRequest.setUserId("user-id-123");
        subscribeRequest.setPlanId(1L);

        subscriptionResponse = UserSubscriptionResponse.builder()
                .id(100L)
                .status(SubscriptionStatus.ACTIVE)
                .build();
    }

    // --- 1. TEST SUBSCRIBE (Đăng ký trực tiếp) ---

    @Test
    void subscribe_Success() {
        // GIVEN
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));
        // Giả sử user đang có gói cũ
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(List.of(activeSubscription));

        when(subscriptionRepository.save(any(UserSubscription.class))).thenReturn(activeSubscription);
        when(subscriptionMapper.toResponse(any(UserSubscription.class))).thenReturn(subscriptionResponse);

        // WHEN
        UserSubscriptionResponse result = userSubscriptionService.subscribe(subscribeRequest);

        // THEN
        assertNotNull(result);
        // Gói cũ phải bị set thành EXPIRED
        assertEquals(SubscriptionStatus.EXPIRED, activeSubscription.getStatus());
        // Save được gọi ít nhất 2 lần (1 lần expire gói cũ, 1 lần save gói mới)
        verify(subscriptionRepository, atLeast(2)).save(any(UserSubscription.class));
    }

    @Test
    void subscribe_UserNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> userSubscriptionService.subscribe(subscribeRequest));
        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void subscribe_PlanNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(planRepository.findById(1L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> userSubscriptionService.subscribe(subscribeRequest));
        assertEquals(ErrorCode.PLAN_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 2. TEST ACTIVATE SUBSCRIPTION (Qua thanh toán) ---

    @Test
    void activateSubscription_Success() {
        // GIVEN
        Payment payment = Payment.builder()
                .userId("user-id-123")
                .planId(1L)
                .amount(BigDecimal.valueOf(100000))
                .build();

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));

        // User đang có gói cũ
        UserSubscription oldSub = UserSubscription.builder()
                .id(99L)
                .status(SubscriptionStatus.ACTIVE)
                .build();
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(List.of(oldSub));

        when(subscriptionRepository.save(any(UserSubscription.class))).thenReturn(activeSubscription);
        when(subscriptionMapper.toResponse(any(UserSubscription.class))).thenReturn(subscriptionResponse);

        // WHEN
        UserSubscriptionResponse result = userSubscriptionService.activateSubscription(payment);

        // THEN
        // Gói cũ phải bị set thành CANCELLED (khác logic subscribe là EXPIRED)
        assertEquals(SubscriptionStatus.CANCELLED, oldSub.getStatus());
        verify(subscriptionRepository, atLeast(2)).save(any(UserSubscription.class));
    }

    @Test
    void activateSubscription_UserNotFound_Fail() {
        Payment payment = Payment.builder().userId("invalid").build();
        when(userRepository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> userSubscriptionService.activateSubscription(payment));
        assertEquals(ErrorCode.USER_NOT_FOUND, ex.getErrorCode());
    }

    // --- 3. TEST CANCEL SUBSCRIPTION ---

    @Test
    void cancelSubscription_Success() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(List.of(activeSubscription));

        userSubscriptionService.cancelSubscription("user-id-123");

        assertEquals(SubscriptionStatus.CANCELLED, activeSubscription.getStatus());
        verify(subscriptionRepository, times(1)).save(activeSubscription);
    }

    // --- 4. TEST GET USER SUBSCRIPTIONS ---

    @Test
    void getUserSubscriptions_Success() {
        Page<UserSubscription> page = new PageImpl<>(List.of(activeSubscription));
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(subscriptionRepository.findByUser(eq(user), any(Pageable.class))).thenReturn(page);
        when(subscriptionMapper.toResponse(activeSubscription)).thenReturn(subscriptionResponse);

        Page<UserSubscriptionResponse> result = userSubscriptionService.getUserSubscriptions("user-id-123", 0, 10);

        assertEquals(1, result.getTotalElements());
    }

    // --- 5. TEST GET VALID SUBSCRIPTION (Logic quan trọng) ---

    @Test
    void getValidSubscription_HasActiveAndValid_ReturnsIt() {
        // GIVEN: User có gói active và chưa hết hạn
        activeSubscription.setEndDateTime(LocalDateTime.now().plusDays(10)); // Còn 10 ngày
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(List.of(activeSubscription));

        // WHEN
        UserSubscription result = userSubscriptionService.getValidSubscription(user);

        // THEN
        assertEquals(activeSubscription, result);
        // Không cần tìm gói Basic
        verify(subscriptionRepository, never()).findBasicPlan(any());
    }

    @Test
    void getValidSubscription_HasActiveButExpired_ReturnsBasic() {
        // GIVEN: User có gói status ACTIVE nhưng ngày hết hạn đã qua
        activeSubscription.setEndDateTime(LocalDateTime.now().minusDays(1)); // Hết hạn hôm qua
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(List.of(activeSubscription));

        // Mock gói Basic
        UserSubscription basicSub = UserSubscription.builder().id(2L).build();
        when(subscriptionRepository.findBasicPlan(user)).thenReturn(Optional.of(basicSub));

        // WHEN
        UserSubscription result = userSubscriptionService.getValidSubscription(user);

        // THEN
        // Gói cũ phải bị update thành EXPIRED
        assertEquals(SubscriptionStatus.EXPIRED, activeSubscription.getStatus());
        verify(subscriptionRepository, times(1)).save(activeSubscription);

        // Kết quả trả về phải là gói Basic
        assertEquals(basicSub, result);
    }

    @Test
    void getValidSubscription_NoActive_ReturnsBasic() {
        // GIVEN: Không có gói Active nào
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(Collections.emptyList());

        UserSubscription basicSub = UserSubscription.builder().id(2L).build();
        when(subscriptionRepository.findBasicPlan(user)).thenReturn(Optional.of(basicSub));

        // WHEN
        UserSubscription result = userSubscriptionService.getValidSubscription(user);

        // THEN
        assertEquals(basicSub, result);
    }

    @Test
    void getValidSubscription_NoBasicPlanFound_Fail() {
        // GIVEN: Không active, và DB lỗi không tìm thấy gói Basic
        when(subscriptionRepository.findByUserAndStatus(user, SubscriptionStatus.ACTIVE))
                .thenReturn(Collections.emptyList());
        when(subscriptionRepository.findBasicPlan(user)).thenReturn(Optional.empty());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> userSubscriptionService.getValidSubscription(user));
        assertEquals(ErrorCode.PLAN_NOT_EXISTED, ex.getErrorCode());
    }
}