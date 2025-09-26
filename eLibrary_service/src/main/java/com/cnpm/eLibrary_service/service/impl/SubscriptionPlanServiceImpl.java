package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.SubscriptionPlanRequest;
import com.cnpm.eLibrary_service.dto.response.SubscriptionPlanResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.SubscriptionPlanMapper;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {
    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionPlanMapper planMapper;

    @Override
    public SubscriptionPlanResponse createPlan(SubscriptionPlanRequest request) {
        SubscriptionPlan plan = planMapper.toSubscriptionPlan(request);
        return planMapper.toSubscriptionPlanResponse(planRepository.save(plan));
    }

    @Override
    public SubscriptionPlanResponse getPlan(Long id) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));
        return planMapper.toSubscriptionPlanResponse(plan);
    }

    @Override
    public List<SubscriptionPlanResponse> getAllPlans() {
        return planRepository.findAll().stream()
                .map(planMapper::toSubscriptionPlanResponse)
                .toList();
    }

    @Override
    public SubscriptionPlanResponse updatePlan(Long id, SubscriptionPlanRequest request) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));

        planMapper.updateSubscriptionPlan(request, plan);
        planRepository.save(plan);

        return planMapper.toSubscriptionPlanResponse(plan);
    }

    @Override
    public void deletePlan(Long id) {
        SubscriptionPlan plan = planRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));
        planRepository.delete(plan);
    }
}
