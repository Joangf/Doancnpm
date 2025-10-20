package com.cnpm.eLibrary_service.dto.request;

import com.cnpm.eLibrary_service.entity.enums.Language;
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
    String translatedTitle;
    Language language;
    String author;
    String publisher;
    Integer publishYear;
    String description;
    String coverUrl;
    String pdfUrl;

    Set<String> categoryNames;
}

