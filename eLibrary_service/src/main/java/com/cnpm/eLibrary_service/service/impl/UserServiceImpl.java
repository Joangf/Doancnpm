package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.ResendEmailRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateEmailRequest;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

        // Check trùng username
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }

        // Check trùng email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

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
    public Page<UserResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable)
                .map(userMapper::toUserResponse);
    }

    @Override
    public UserResponse updateUser(String id, UpdateUserRequest request) {
        User user =userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        userMapper.updateUser(request, user);
        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    @Override
    public void deleteUser(String id) {
        User user =userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        userRepository.delete(user);
    }

    @Override
    public UserResponse updateEmailBeforeVerification(String userId, UpdateEmailRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        if (user.isVerified()) {
            throw new AppException(ErrorCode.CANNOT_CHANGE_EMAIL_AFTER_VERIFICATION);
        }

        // Check trùng email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        user.setEmail(request.getEmail());
        userRepository.save(user);

        // Gửi lại OTP tới email mới
        verificationService.sendVerificationOtp(request.getEmail());

        return userMapper.toUserResponse(user);
    }

    @Override
    public void resendVerificationOtp(ResendEmailRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        if (user.isVerified()) {
            throw new AppException(ErrorCode.ALREADY_VERIFIED);
        }

        verificationService.sendVerificationOtp(request.getEmail());
    }


}
