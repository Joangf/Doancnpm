package com.cnpm.eLibrary_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BorrowResponse {
    Long id;
    String userId;
    Long bookId;
    String bookTitle;
    LocalDateTime borrowDateTime;
    LocalDateTime dueDateTime;
    LocalDateTime returnDateTime;
}
