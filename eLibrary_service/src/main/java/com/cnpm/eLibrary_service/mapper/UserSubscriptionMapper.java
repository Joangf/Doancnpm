package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.response.UserSubscriptionResponse;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserSubscriptionMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "subscriptionPlan.name", target = "planName")
    UserSubscriptionResponse toResponse(UserSubscription subscription);
}
