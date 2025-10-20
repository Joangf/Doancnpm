package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.SubscriptionPlanRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.SubscriptionPlanResponse;
import com.cnpm.eLibrary_service.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscription-plan")
@RequiredArgsConstructor
public class SubscriptionPlanController {
    private final SubscriptionPlanService planService;

    @PostMapping
    public ApiResponse<SubscriptionPlanResponse> createPlan(@RequestBody SubscriptionPlanRequest request) {
        return ApiResponse.<SubscriptionPlanResponse>builder()
                .result(planService.createPlan(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<SubscriptionPlanResponse> getPlan(@PathVariable Long id) {
        return ApiResponse.<SubscriptionPlanResponse>builder()
                .result(planService.getPlan(id))
                .build();
    }

    @GetMapping
    public ApiResponse<List<SubscriptionPlanResponse>> getAllPlans() {
        return ApiResponse.<List<SubscriptionPlanResponse>>builder()
                .result(planService.getAllPlans())
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<SubscriptionPlanResponse> updatePlan(@PathVariable Long id,
                                                            @RequestBody SubscriptionPlanRequest request) {
        return ApiResponse.<SubscriptionPlanResponse>builder()
                .result(planService.updatePlan(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ApiResponse.<String>builder()
                .result("Subscription plan has been deleted successfully")
                .build();
    }
}
