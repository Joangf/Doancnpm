package com.cnpm.eLibrary_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RateBookResponse {
    String userId;
    Long bookId;
    Integer rating;
    Double averageRating;
}
