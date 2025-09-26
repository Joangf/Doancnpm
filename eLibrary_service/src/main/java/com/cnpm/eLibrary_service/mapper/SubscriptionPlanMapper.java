package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.request.SubscriptionPlanRequest;
import com.cnpm.eLibrary_service.dto.response.SubscriptionPlanResponse;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface SubscriptionPlanMapper {
    SubscriptionPlan toSubscriptionPlan(SubscriptionPlanRequest request);
    SubscriptionPlanResponse toSubscriptionPlanResponse(SubscriptionPlan plan);

    void updateSubscriptionPlan(SubscriptionPlanRequest request, @MappingTarget SubscriptionPlan plan);
}
