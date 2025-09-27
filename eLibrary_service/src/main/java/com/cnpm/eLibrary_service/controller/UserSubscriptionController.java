package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.SubscribeRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.UserSubscriptionResponse;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class UserSubscriptionController {

    private final UserSubscriptionService subscriptionService;


    @PostMapping("/subscribe")
    public ApiResponse<UserSubscriptionResponse> subscribe(@RequestBody SubscribeRequest request) {
        return ApiResponse.<UserSubscriptionResponse>builder()
                .result(subscriptionService.subscribe(request))
                .build();
    }


    @PostMapping("/cancel/{userId}")
    public ApiResponse<Void> cancel(@PathVariable String userId) {
        subscriptionService.cancelSubscription(userId);
        return ApiResponse.<Void>builder()
                .message("Subscription cancelled successfully")
                .build();
    }


    @GetMapping("/user/{userId}")
    public ApiResponse<List<UserSubscriptionResponse>> getUserSubscriptions(@PathVariable String userId) {
        return ApiResponse.<List<UserSubscriptionResponse>>builder()
                .result(subscriptionService.getUserSubscriptions(userId))
                .build();
    }
}
