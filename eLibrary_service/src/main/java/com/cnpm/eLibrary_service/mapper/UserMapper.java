package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.dto.response.UserResponse;
import com.cnpm.eLibrary_service.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper {
    @Mapping(target = "subscriptions", ignore = true)
    @Mapping(target = "borrows", ignore = true)
    User toUser(CreateUserRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "subscriptions", ignore = true)
    @Mapping(target = "borrows", ignore = true)
    void updateUser(UpdateUserRequest request, @MappingTarget User user);
}
