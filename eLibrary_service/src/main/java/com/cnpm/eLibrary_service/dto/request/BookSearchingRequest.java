package com.cnpm.eLibrary_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookSearchingRequest {
    String keyword;
    List<Long> categoryIds;
}
