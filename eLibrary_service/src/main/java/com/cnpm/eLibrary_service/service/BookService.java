package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.BookFilterRequest;
import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.request.BookSearchingRequest;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BookService {
    BookResponse createBook(BookRequest request);
    BookResponse getBook(Long id);
    Page<BookResponse> getAllBooks(int page, int size);
    BookResponse updateBook(Long id, BookRequest request);
    void deleteBook(Long id);

    Page<BookResponse> search(BookSearchingRequest request,int page, int size);

    Page<BookResponse> filterBooks(BookFilterRequest request, int page, int size);
}
