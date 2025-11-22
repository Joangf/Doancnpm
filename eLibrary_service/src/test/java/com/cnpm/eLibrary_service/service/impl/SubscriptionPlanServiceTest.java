package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.SubscriptionPlanRequest;
import com.cnpm.eLibrary_service.dto.response.SubscriptionPlanResponse;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.SubscriptionPlanMapper;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SubscriptionPlanServiceTest {

    @Mock
    private SubscriptionPlanRepository planRepository;

    @Mock
    private SubscriptionPlanMapper planMapper;

    @InjectMocks
    private SubscriptionPlanServiceImpl planService;

    private SubscriptionPlan plan;
    private SubscriptionPlanRequest request;
    private SubscriptionPlanResponse response;

    @BeforeEach
    void setup() {
        // Chuẩn bị dữ liệu mẫu
        plan = SubscriptionPlan.builder()
                .id(1L)
                .name("PREMIUM")
                .price(BigDecimal.valueOf(200000L))
                .duration(30)
                .maxBorrowDays(14)
                .maxBorrowNumbers(5)
                .build();

        request = SubscriptionPlanRequest.builder()
                .name("PREMIUM")
                .price(BigDecimal.valueOf(200000L))
                .duration(30)
                .maxBorrowDays(14)
                .maxBorrowNumbers(5)
                .build();

        response = SubscriptionPlanResponse.builder()
                .id(1L)
                .name("PREMIUM")
                .price(BigDecimal.valueOf(200000L))
                .duration(30)
                .maxBorrowDays(14)
                .maxBorrowNumbers(5)
                .build();
    }

    // --- 1. TEST CREATE PLAN ---

    @Test
    void createPlan_Success() {
        // GIVEN
        when(planMapper.toSubscriptionPlan(request)).thenReturn(plan);
        when(planRepository.save(plan)).thenReturn(plan);
        when(planMapper.toSubscriptionPlanResponse(plan)).thenReturn(response);

        // WHEN
        SubscriptionPlanResponse result = planService.createPlan(request);

        // THEN
        assertNotNull(result);
        assertEquals("PREMIUM", result.getName());
        assertEquals(BigDecimal.valueOf(200000L), result.getPrice());

        verify(planRepository, times(1)).save(plan);
    }

    // --- 2. TEST GET PLAN ---

    @Test
    void getPlan_Success() {
        // GIVEN
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));
        when(planMapper.toSubscriptionPlanResponse(plan)).thenReturn(response);

        // WHEN
        SubscriptionPlanResponse result = planService.getPlan(1L);

        // THEN
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void getPlan_NotFound_Fail() {
        // GIVEN
        when(planRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> planService.getPlan(99L));
        assertEquals(ErrorCode.PLAN_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 3. TEST GET ALL PLANS ---

    @Test
    void getAllPlans_Success() {
        // GIVEN
        when(planRepository.findAll()).thenReturn(List.of(plan));
        when(planMapper.toSubscriptionPlanResponse(plan)).thenReturn(response);

        // WHEN
        List<SubscriptionPlanResponse> result = planService.getAllPlans();

        // THEN
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("PREMIUM", result.get(0).getName());
    }

    // --- 4. TEST UPDATE PLAN ---

    @Test
    void updatePlan_Success() {
        // GIVEN
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));
        when(planRepository.save(plan)).thenReturn(plan);
        when(planMapper.toSubscriptionPlanResponse(plan)).thenReturn(response);

        // Mock mapper behavior (void method)
        doAnswer(invocation -> {
            SubscriptionPlanRequest req = invocation.getArgument(0);
            SubscriptionPlan p = invocation.getArgument(1);
            p.setName(req.getName()); // Giả lập mapper update tên
            return null;
        }).when(planMapper).updateSubscriptionPlan(request, plan);

        // WHEN
        SubscriptionPlanResponse result = planService.updatePlan(1L, request);

        // THEN
        assertNotNull(result);
        verify(planMapper, times(1)).updateSubscriptionPlan(request, plan);
        verify(planRepository, times(1)).save(plan);
    }

    @Test
    void updatePlan_NotFound_Fail() {
        // GIVEN
        when(planRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> planService.updatePlan(99L, request));
        assertEquals(ErrorCode.PLAN_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 5. TEST DELETE PLAN ---

    @Test
    void deletePlan_Success() {
        // GIVEN
        when(planRepository.findById(1L)).thenReturn(Optional.of(plan));

        // WHEN
        planService.deletePlan(1L);

        // THEN
        verify(planRepository, times(1)).delete(plan);
    }

    @Test
    void deletePlan_NotFound_Fail() {
        // GIVEN
        when(planRepository.findById(99L)).thenReturn(Optional.empty());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> planService.deletePlan(99L));
        assertEquals(ErrorCode.PLAN_NOT_EXISTED, ex.getErrorCode());

        // Verify delete ko bao giờ được gọi
        verify(planRepository, never()).delete(any());
    }
}