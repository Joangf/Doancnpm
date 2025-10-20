package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.BookFilterRequest;
import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.request.BookSearchingRequest;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.es_document.BookEs;
import com.cnpm.eLibrary_service.es_mapper.BookEsMapper;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.BookMapper;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.service.BookService;
import com.cnpm.eLibrary_service.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookEsRepository bookEsRepository;
    private final CategoryRepository categoryRepository; // thêm repo cho category
    private final BookMapper bookMapper;
    private final BookEsMapper bookEsMapper;
    private final FileService fileService;

    @Override
    public BookResponse createBook(BookRequest request) {
        // Map request → entity
        Book book = bookMapper.toBook(request);

        if (request.getCategoryNames() == null || request.getCategoryNames().isEmpty()) {
            throw new AppException(ErrorCode.BOOK_MUST_HAVE_CATEGORY);
        }

        // Lấy categories từ DB theo Names
        Set<Category> categories = categoryRepository.findAllByNameIn(request.getCategoryNames())
                .stream().collect(Collectors.toSet());

        // Validate: nếu có id không tồn tại
        if (categories.size() != request.getCategoryNames().size()) {
            throw new AppException(ErrorCode.CATEGORY_NAME_NOT_EXISTED);
        }

        // Gắn categories vào book
        book.setCategories(categories);

        Book savedBook =  bookRepository.save(book);

        bookEsRepository.save(bookEsMapper.toBookEs(savedBook));

        // Save và trả response
        return bookMapper.toBookResponse(savedBook);
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
            if (request.getCategoryNames().isEmpty()) {
                throw new AppException(ErrorCode.BOOK_MUST_HAVE_CATEGORY);
            }

            Set<Category> categories = categoryRepository.findAllByNameIn(request.getCategoryNames())
                    .stream().collect(Collectors.toSet());

            if (categories.size() != request.getCategoryNames().size()) {
                throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
            }
            book.setCategories(categories);

        }

        Book updatedBook = bookRepository.save(book);

        bookEsRepository.save(bookEsMapper.toBookEs(updatedBook));

        return bookMapper.toBookResponse(updatedBook);
    }

    @Override
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));
        bookRepository.delete(book);

        bookRepository.delete(book);

        bookEsRepository.deleteById(book.getId().toString());
    }

    @Override
    public Page<BookResponse> search(BookSearchingRequest request, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<BookEs> results;

        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            results = bookEsRepository.searchByKeywordAndCategories(
                    request.getKeyword(),
                    request.getCategoryIds(),
                    pageable
            );
        } else {
            results = bookEsRepository.searchByKeyword(
                    request.getKeyword(),
                    pageable
            );
        }

        return results.map(bookEsMapper::toBookResponse);
    }

    @Override
    public Page<BookResponse> filterBooks(BookFilterRequest request, int page, int size) {
        List<Long> categoryIds = request.getCategoryIds();

        if (categoryIds == null || categoryIds.isEmpty()) {
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);
        }


        List<Category> categories = categoryRepository.findAllById(categoryIds);
        if (categories.isEmpty() || categories.size() != categoryIds.size())
            throw new AppException(ErrorCode.CATEGORY_NOT_EXISTED);

        Pageable pageable = PageRequest.of(page,size);

        Page<Book> books = bookRepository.findDistinctByCategoriesIn(categories, pageable);

        return books.map(bookMapper::toBookResponse);
    }

    @Override
    public String uploadCover(Long id, MultipartFile file) throws IOException {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        String coverUrl = fileService.saveFile(file, "book_covers");
        book.setCoverUrl(coverUrl);
        bookRepository.save(book);

        return coverUrl;
    }

}
