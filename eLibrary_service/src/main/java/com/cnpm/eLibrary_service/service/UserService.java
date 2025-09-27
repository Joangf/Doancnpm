package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(CreateUserRequest request);

    UserResponse getUserInfo(String id);

    List<UserResponse> getAllUsers();

    UserResponse updateUser(String id, UpdateUserRequest request);

    void deleteUser(String id);

}