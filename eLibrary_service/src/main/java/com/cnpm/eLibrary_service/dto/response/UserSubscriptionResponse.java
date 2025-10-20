package com.cnpm.eLibrary_service.dto.response;

import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserSubscriptionResponse {
    Long id;
    String userId;
    String planName;
    LocalDateTime startDateTime;
    LocalDateTime endDateTime;
    SubscriptionStatus status;
    BigDecimal priceAtPurchase;
}

