package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.UserResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getUserInfo(String id);

    Page<UserResponse> getAllUsers(int page, int size);

    UserResponse updateUser(String id, UpdateUserRequest request);

    void deleteUser(String id);

}