package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.UserResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.UserMapper;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import com.cnpm.eLibrary_service.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    VerificationServiceImpl verificationService;
    SubscriptionPlanRepository planRepository;
    UserSubscriptionRepository userSubscriptionRepository;


    @Override
    public UserResponse createUser(CreateUserRequest request) {

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setVerified(false);
        userRepository.save(user);

        SubscriptionPlan basicPlan = planRepository.findByName("BASIC")
                .orElseThrow(() -> new AppException(ErrorCode.PLAN_NOT_EXISTED));

        UserSubscription subscription = UserSubscription.builder()
                .user(user)
                .subscriptionPlan(basicPlan)
                .startDateTime(LocalDateTime.now())
                .endDateTime(null)
                .build();

        userSubscriptionRepository.save(subscription);

        verificationService.sendVerificationOtp(user.getEmail());

        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse getUserInfo(String id) {
        User user =userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));
        return userMapper.toUserResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserResponse updateUser(String id, UpdateUserRequest request) {
        User user =userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        userMapper.updateUser(request, user);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    @Override
    public void deleteUser(String id) {
        User user =userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        userRepository.delete(user);
    }
}
