package com.cnpm.eLibrary_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SubscriptionPlanResponse {
    String name;
    Integer maxBorrowNumbers;
    Integer maxBorrowDays;
    Integer duration;
    BigDecimal price;
}
