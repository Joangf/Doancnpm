package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.BookFilterRequest;
import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.request.BookSearchingRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ApiResponse<BookResponse> createBook(@RequestBody BookRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.createBook(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BookResponse> getBook(@PathVariable Long id) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.getBook(id))
                .build();
    }

    @GetMapping
    public ApiResponse<Page<BookResponse>> getAllBooks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<BookResponse>>builder()
                .result(bookService.getAllBooks(page,size))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BookResponse> updateBook(@PathVariable Long id,
                                                @RequestBody BookRequest request) {
        return ApiResponse.<BookResponse>builder()
                .result(bookService.updateBook(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ApiResponse.<String>builder()
                .result("Book has been deleted successfully")
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<Page<BookResponse>> search(
            @RequestBody BookSearchingRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<BookResponse>>builder()
                .result(bookService.search(request,page,size))
                .build();
    }

    @PostMapping("/filter")
    public  ApiResponse<Page<BookResponse>> filter(
            @RequestBody BookFilterRequest request,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<BookResponse>>builder()
                .result(bookService.filterBooks(request,page,size))
                .build();
    }
}
