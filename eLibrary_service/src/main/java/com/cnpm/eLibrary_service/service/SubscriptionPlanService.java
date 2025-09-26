package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.SubscriptionPlanRequest;
import com.cnpm.eLibrary_service.dto.response.SubscriptionPlanResponse;

import java.util.List;

public interface SubscriptionPlanService {
    SubscriptionPlanResponse createPlan(SubscriptionPlanRequest request);
    SubscriptionPlanResponse getPlan(Long id);
    List<SubscriptionPlanResponse> getAllPlans();
    SubscriptionPlanResponse updatePlan(Long id, SubscriptionPlanRequest request);
    void deletePlan(Long id);
}
