package com.cnpm.eLibrary_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookResponse {
    Long id;
    String title;
    String author;
    String publisher;
    Integer publishYear;
    String description;
    String pdfUrl;
    String coverUrl;
    Double averageRating;
    LocalDateTime insertAt;

    Set<CategoryResponse> categories;

}

