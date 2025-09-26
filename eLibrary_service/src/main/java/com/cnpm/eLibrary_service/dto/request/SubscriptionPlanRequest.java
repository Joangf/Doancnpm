package com.cnpm.eLibrary_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubscriptionPlanRequest {
    String name;
    Integer maxBorrowNumbers;
    Integer maxBorrowDays;
    Integer duration;
    BigDecimal price;
}
