package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    BookResponse createBook(BookRequest request);
    BookResponse getBook(Long id);
    List<BookResponse> getAllBooks();
    BookResponse updateBook(Long id, BookRequest request);
    void deleteBook(Long id);
}
