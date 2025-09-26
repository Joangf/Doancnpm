package com.cnpm.eLibrary_service.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookRequest {
    String title;
    String author;
    String publisher;
    Integer publishYear;
    String description;
    String pdfUrl;

    Set<Long> categoryIds;
}

