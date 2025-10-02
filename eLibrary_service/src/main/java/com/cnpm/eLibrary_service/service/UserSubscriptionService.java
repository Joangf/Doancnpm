package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.SubscribeRequest;
import com.cnpm.eLibrary_service.dto.response.UserSubscriptionResponse;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserSubscriptionService {
    UserSubscriptionResponse subscribe(SubscribeRequest request);
    void cancelSubscription(String userId);
    Page<UserSubscriptionResponse> getUserSubscriptions(String userId,int page, int size);

    UserSubscription getValidSubscription(User user);
}
