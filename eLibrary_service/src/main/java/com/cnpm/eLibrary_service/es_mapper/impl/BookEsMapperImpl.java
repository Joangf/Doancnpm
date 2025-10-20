package com.cnpm.eLibrary_service.es_mapper.impl;

import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.es_document.BookEs;
import com.cnpm.eLibrary_service.es_mapper.BookEsMapper;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BookEsMapperImpl implements BookEsMapper {
    private final CategoryRepository categoryRepository;

    @Override
    public BookEs toBookEs(Book book) {
        BookEs bookEs = new BookEs();
        bookEs.setId(book.getId().toString());
        bookEs.setTitle(book.getTitle());
        bookEs.setTranslatedTitle(book.getTranslatedTitle());
        bookEs.setAuthor(book.getAuthor());
        bookEs.setPublisher(book.getPublisher());
        bookEs.setDescription(book.getDescription());
        bookEs.setLanguage(book.getLanguage().name());
        bookEs.setPublishYear(book.getPublishYear());
        bookEs.setCategoryIds(
                book.getCategories().stream()
                        .map(c -> c.getId())
                        .collect(Collectors.toSet())
        );
        bookEs.setCoverUrl(book.getCoverUrl());
        bookEs.setPdfUrl(book.getPdfUrl());
        return bookEs;
    }

    @Override
    public BookResponse toBookResponse(BookEs bookEs) {
        // Lấy categories từ DB dựa trên các ID lưu trong ES
        Set<CategoryResponse> categories = categoryRepository.findAllById(bookEs.getCategoryIds())
                .stream()
                .map(c -> CategoryResponse.builder()
                        .id(c.getId())
                        .name(c.getName())
                        .build())
                .collect(Collectors.toSet());

        // Trả về BookResponse
        return BookResponse.builder()
                .id(Long.valueOf(bookEs.getId()))
                .title(bookEs.getTitle())
                .author(bookEs.getAuthor())
                .publisher(bookEs.getPublisher())
                .publishYear(bookEs.getPublishYear())
                .description(bookEs.getDescription())
                .pdfUrl(bookEs.getPdfUrl())
                .categories(categories)
                .build();
    }
}
