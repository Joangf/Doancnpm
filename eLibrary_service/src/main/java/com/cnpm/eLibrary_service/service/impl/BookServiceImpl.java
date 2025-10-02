package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.BookMapper;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository; // thêm repo cho category
    private final BookMapper bookMapper;

    @Override
    public BookResponse createBook(BookRequest request) {
        // Map request → entity
        Book book = bookMapper.toBook(request);

        // Lấy categories từ DB theo Names
        Set<Category> categories = categoryRepository.findAllByNameIn(request.getCategoryNames())
                .stream().collect(Collectors.toSet());

        // Validate: nếu có id không tồn tại
        if (categories.size() != request.getCategoryNames().size()) {
            throw new AppException(ErrorCode.CATEGORY_NAME_NOT_EXISTED);
        }

        // Gắn categories vào book
        book.setCategories(categories);

        // Save và trả response
        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public BookResponse getBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        return bookMapper.toBookResponse(book);
    }

    @Override
    public Page<BookResponse> getAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);

        return bookRepository.findAll(pageable)
                .map(bookMapper::toBookResponse);
    }

    @Override
    public BookResponse updateBook(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        // update các field cơ bản
        bookMapper.updateBook(request, book);

        // update categories nếu request có gửi
        if (request.getCategoryNames() != null) {
            Set<Category> categories = categoryRepository.findAllByNameIn(request.getCategoryNames())
                    .stream().collect(Collectors.toSet());

            if (categories.size() != request.getCategoryNames().size()) {
                throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
            }
            book.setCategories(categories);
        }

        return bookMapper.toBookResponse(bookRepository.save(book));
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        bookRepository.delete(book);
    }
}
