package com.cnpm.eLibrary_service.entity;

import com.cnpm.eLibrary_service.entity.enums.Language;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;
    String translatedTitle;

    @Enumerated(EnumType.STRING)
    Language language;

    String author;
    String publisher;
    Integer publishYear;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(length = 1000)
    String pdfUrl;

    @Column(length = 1000)
    String coverUrl;

    @ManyToMany
    Set<Category> categories;
}
