package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.SubscribeRequest;
import com.cnpm.eLibrary_service.dto.response.UserSubscriptionResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.UserSubscriptionMapper;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserSubscriptionServiceImpl implements UserSubscriptionService {

    private final UserRepository userRepository;
    private final SubscriptionPlanRepository planRepository;
    private final UserSubscriptionRepository subscriptionRepository;
    private final UserSubscriptionMapper subscriptionMapper;
    private final MailService mailService;

    @Override
    public UserSubscriptionResponse subscribe(SubscribeRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        SubscriptionPlan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));

        // Hủy subscription ACTIVE hiện tại (nếu có)
        List<UserSubscription> activeSubs = subscriptionRepository
                .findByUserAndStatus(user, SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : activeSubs) {
            sub.setStatus(SubscriptionStatus.EXPIRED);
            subscriptionRepository.save(sub);
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endDateTime = now.plusDays(plan.getDuration());

        UserSubscription subscription = UserSubscription.builder()
                .user(user)
                .subscriptionPlan(plan)
                .startDateTime(now)
                .endDateTime(endDateTime)
                .status(SubscriptionStatus.ACTIVE)
                .priceAtPurchase(plan.getPrice())
                .build();

        subscriptionRepository.save(subscription);

        return subscriptionMapper.toResponse(subscription);
    }

    @Override
    public void cancelSubscription(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        List<UserSubscription> activeSubs = subscriptionRepository
                .findByUserAndStatus(user, SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : activeSubs) {
            sub.setStatus(SubscriptionStatus.CANCELLED);
            subscriptionRepository.save(sub);
        }
    }

    @Override
    public List<UserSubscriptionResponse> getUserSubscriptions(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        return subscriptionRepository.findByUser(user).stream()
                .map(subscriptionMapper::toResponse)
                .toList();
    }

    /**
     * Hàm dùng trong logic mượn sách: trả về subscription còn hiệu lực
     */
    @Override
    public UserSubscription getValidSubscription(User user) {
        LocalDateTime now = LocalDateTime.now();

        List<UserSubscription> activeSubs = subscriptionRepository
                .findByUserAndStatus(user, SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : activeSubs) {
            if (sub.getEndDateTime() != null && sub.getEndDateTime().isBefore(now)) {
                // hết hạn thì chuyển trạng thái
                sub.setStatus(SubscriptionStatus.EXPIRED);
                subscriptionRepository.save(sub);
            } else {
                // còn hạn thì return ngay
                return sub;
            }
        }

        // fallback về subscription BASIC của user
        return subscriptionRepository.findBasicPlan(user)
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));
    }

}
