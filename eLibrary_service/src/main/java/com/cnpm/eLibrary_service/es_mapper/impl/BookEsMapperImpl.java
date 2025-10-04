package com.cnpm.eLibrary_service.es_mapper.impl;

import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.es_document.BookEs;
import com.cnpm.eLibrary_service.es_mapper.BookEsMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class BookEsMapperImpl implements BookEsMapper {
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
}
