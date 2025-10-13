package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.ResendEmailRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateEmailRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.UserResponse;
import com.cnpm.eLibrary_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    ApiResponse<UserResponse> createUser(@RequestBody CreateUserRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.createUser(request))
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUserInfo(@PathVariable String id) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserInfo(id))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<UserResponse>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<UserResponse>>builder()
                .result(userService.getAllUsers(page, size))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String id, @RequestBody UpdateUserRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateUser(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ApiResponse.<String>builder()
                .result("User has been deleted successfully")
                .build();
    }

    @PutMapping("/{userId}/email")
    public ApiResponse<UserResponse> updateEmailBeforeVerification(
            @PathVariable String userId,
            @RequestBody UpdateEmailRequest request
    ) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.updateEmailBeforeVerification(userId,request))
                .build();
    }

    @PostMapping("/resend")
    public ApiResponse<String> resendVerificationOtp(@RequestBody ResendEmailRequest request){
        userService.resendVerificationOtp(request);

        return ApiResponse.<String>builder()
                .result("Resent otp code")
                .build();
    }
}
