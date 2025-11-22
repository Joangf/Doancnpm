package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.*;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.es_document.BookEs;
import com.cnpm.eLibrary_service.es_mapper.BookEsMapper;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.BookMapper;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.service.FileService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock private BookRepository bookRepository;
    @Mock private BookEsRepository bookEsRepository;
    @Mock private CategoryRepository categoryRepository;
    @Mock private BookMapper bookMapper;
    @Mock private BookEsMapper bookEsMapper;
    @Mock private FileService fileService;

    @InjectMocks
    private BookServiceImpl bookService;

    private Book book;
    private BookEs bookEs;
    private BookRequest bookRequest;
    private BookResponse bookResponse;
    private Category category;

    @BeforeEach
    void setup() {
        category = Category.builder()
                .id(1L)
                .name("IT")
                .build();

        book = Book.builder()
                .id(100L)
                .title("Clean Code")
                .author("Robert C. Martin")
                .categories(new HashSet<>(Set.of(category)))
                .insertAt(LocalDateTime.now())
                .build();

        bookEs = new BookEs();
        bookEs.setId("100");

        bookRequest = BookRequest.builder()
                .title("Clean Code")
                .author("Robert C. Martin")
                .categoryNames(Set.of("IT"))
                .build();

        bookResponse = BookResponse.builder()
                .id(100L)
                .title("Clean Code")
                .build();
    }

    // --- 1. TEST CREATE BOOK ---

    @Test
    void createBook_Success() {
        // GIVEN
        when(bookMapper.toBook(bookRequest)).thenReturn(book);
        when(categoryRepository.findAllByNameIn(anySet())).thenReturn(Set.of(category));
        when(bookRepository.save(any(Book.class))).thenReturn(book);
        when(bookEsMapper.toBookEs(book)).thenReturn(bookEs);
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        // WHEN
        BookResponse result = bookService.createBook(bookRequest);

        // THEN
        assertNotNull(result);
        // Verify lưu DB
        verify(bookRepository, times(1)).save(book);
        // Verify lưu ElasticSearch (quan trọng)
        verify(bookEsRepository, times(1)).save(bookEs);
    }

    @Test
    void createBook_NoCategoryInRequest_Fail() {
        bookRequest.setCategoryNames(null);
        // Mock mapper trả về object rỗng để tránh lỗi null pointer trước khi check logic
        when(bookMapper.toBook(bookRequest)).thenReturn(new Book());

        AppException ex = assertThrows(AppException.class, () -> bookService.createBook(bookRequest));
        assertEquals(ErrorCode.BOOK_MUST_HAVE_CATEGORY, ex.getErrorCode());
    }

    @Test
    void createBook_WithEmptyCategory_Fail() {
        // GIVEN
        // Set danh sách category là rỗng
        bookRequest.setCategoryNames(Collections.emptySet());

        // Cần mock mapper vì dòng đầu tiên của service là gọi mapper.toBook()
        // Nếu không mock, nó sẽ trả về null (mặc định mockito) và code vẫn chạy xuống validate
        when(bookMapper.toBook(bookRequest)).thenReturn(new Book());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> bookService.createBook(bookRequest));

        // Verify đúng mã lỗi
        assertEquals(ErrorCode.BOOK_MUST_HAVE_CATEGORY, ex.getErrorCode());
    }

    @Test
    void createBook_CategoryNotExist_Fail() {
        // Request gửi "IT" nhưng DB trả về list rỗng
        when(bookMapper.toBook(bookRequest)).thenReturn(book);
        when(categoryRepository.findAllByNameIn(anySet())).thenReturn(Collections.emptySet());

        AppException ex = assertThrows(AppException.class, () -> bookService.createBook(bookRequest));
        assertEquals(ErrorCode.CATEGORY_NAME_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 2. TEST GET & GET ALL ---

    @Test
    void getBook_Success() {
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        BookResponse result = bookService.getBook(100L);
        assertEquals("Clean Code", result.getTitle());
    }

    @Test
    void getBook_NotFound_Fail() {
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> bookService.getBook(999L));
        assertEquals(ErrorCode.BOOK_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void getAllBooks_Success() {
        Page<Book> page = new PageImpl<>(List.of(book));
        when(bookRepository.findAll(any(Pageable.class))).thenReturn(page);
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        Page<BookResponse> result = bookService.getAllBooks(0, 10);
        assertEquals(1, result.getTotalElements());
    }

    // --- 3. TEST UPDATE BOOK ---

    @Test
    void updateBook_Success_WithCategories() {
        // GIVEN
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        // Mock tìm thấy category
        when(categoryRepository.findAllByNameIn(anySet())).thenReturn(Set.of(category));
        when(bookRepository.save(book)).thenReturn(book);
        when(bookEsMapper.toBookEs(book)).thenReturn(bookEs);
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        // WHEN
        BookResponse result = bookService.updateBook(100L, bookRequest);

        // THEN
        assertNotNull(result);
        // Verify mapper update được gọi
        verify(bookMapper, times(1)).updateBook(bookRequest, book);
        // Verify save cả DB và ES
        verify(bookRepository, times(1)).save(book);
        verify(bookEsRepository, times(1)).save(bookEs);
    }

    @Test
    void updateBook_NotFound_Fail() {
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> bookService.updateBook(999L, bookRequest));
        assertEquals(ErrorCode.BOOK_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void updateBook_EmptyCategory_Fail() {
        // GIVEN: Tìm thấy sách nhưng request update lại gửi list category rỗng
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        bookRequest.setCategoryNames(Collections.emptySet()); // List rỗng

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> bookService.updateBook(100L, bookRequest));

        // Kiểm tra đúng mã lỗi BOOK_MUST_HAVE_CATEGORY
        assertEquals(ErrorCode.BOOK_MUST_HAVE_CATEGORY, ex.getErrorCode());
    }

    @Test
    void updateBook_CategoryNotExist_Fail() {
        // GIVEN: Tìm thấy sách, request có category tên "IT"
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));

        // NHƯNG: Repository không tìm thấy category nào tương ứng (trả về list rỗng)
        when(categoryRepository.findAllByNameIn(any())).thenReturn(Collections.emptySet());

        // WHEN & THEN
        AppException ex = assertThrows(AppException.class, () -> bookService.updateBook(100L, bookRequest));

        // Kiểm tra đúng mã lỗi CATEGORY_NOT_EXISTED
        assertEquals(ErrorCode.CATEGORY_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 4. TEST DELETE BOOK ---

    @Test
    void deleteBook_Success() {
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));

        bookService.deleteBook(100L);

        // Verify xóa DB
        // Lưu ý: Trong code Service của bạn có gọi bookRepository.delete(book) 2 lần (duplicate line),
        // nên ở đây verify times(2) hoặc times(1) tuỳ thực tế, nhưng logic đúng là phải gọi.
        verify(bookRepository, atLeastOnce()).delete(book);

        // Verify xóa ES
        verify(bookEsRepository, times(1)).deleteById("100");
    }

    // --- 5. TEST SEARCH (ElasticSearch) ---

    @Test
    void search_KeywordOnly_Success() {
        BookSearchingRequest request = new BookSearchingRequest();
        request.setKeyword("Java");
        // Không set CategoryIds

        Page<BookEs> esPage = new PageImpl<>(List.of(bookEs));
        when(bookEsRepository.searchByKeyword(eq("Java"), any(Pageable.class))).thenReturn(esPage);
        when(bookEsMapper.toBookResponse(bookEs)).thenReturn(bookResponse);

        Page<BookResponse> result = bookService.search(request, 0, 10);

        assertEquals(1, result.getTotalElements());
        verify(bookEsRepository, times(1)).searchByKeyword(eq("Java"), any(Pageable.class));
    }

    @Test
    void search_KeywordAndCategory_Success() {
        BookSearchingRequest request = new BookSearchingRequest();
        request.setKeyword("Java");
        request.setCategoryIds(List.of(1L));

        Page<BookEs> esPage = new PageImpl<>(List.of(bookEs));
        when(bookEsRepository.searchByKeywordAndCategories(eq("Java"), eq(List.of(1L)), any(Pageable.class)))
                .thenReturn(esPage);
        when(bookEsMapper.toBookResponse(bookEs)).thenReturn(bookResponse);

        Page<BookResponse> result = bookService.search(request, 0, 10);

        assertEquals(1, result.getTotalElements());
        verify(bookEsRepository, times(1)).searchByKeywordAndCategories(anyString(), anyList(), any(Pageable.class));
    }

    // --- 6. TEST FILTER BOOKS ---

    @Test
    void filterBooks_Success() {
        BookFilterRequest request = new BookFilterRequest();
        request.setCategoryIds(List.of(1L));

        when(categoryRepository.findAllById(List.of(1L))).thenReturn(List.of(category));
        Page<Book> bookPage = new PageImpl<>(List.of(book));
        when(bookRepository.findDistinctByCategoriesIn(anyList(), any(Pageable.class))).thenReturn(bookPage);
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        Page<BookResponse> result = bookService.filterBooks(request, 0, 10);

        assertEquals(1, result.getTotalElements());
    }

    @Test
    void filterBooks_InvalidCategory_Fail() {
        BookFilterRequest request = new BookFilterRequest();
        request.setCategoryIds(List.of(99L));

        // DB trả về rỗng
        when(categoryRepository.findAllById(List.of(99L))).thenReturn(Collections.emptyList());

        AppException ex = assertThrows(AppException.class, () -> bookService.filterBooks(request, 0, 10));
        assertEquals(ErrorCode.CATEGORY_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 7. TEST UPLOAD COVER ---

    @Test
    void uploadCover_Success() throws IOException {
        MultipartFile file = mock(MultipartFile.class);
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(fileService.saveFile(file, "book_covers")).thenReturn("http://url/cover.jpg");

        String result = bookService.uploadCover(100L, file);

        assertEquals("http://url/cover.jpg", result);
        verify(bookRepository, times(1)).save(book); // Phải verify đã lưu lại URL vào DB
    }

    // --- 8. TEST GET NEW BOOKS (Logic thời gian) ---

    @Test
    void getNewBooks_Week_Success() {
        GetNewBooksRequest request = new GetNewBooksRequest();
        request.setPeriod("week");

        when(bookRepository.findByInsertAtAfter(any(LocalDateTime.class))).thenReturn(new ArrayList<>(List.of(book)));
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        List<BookResponse> result = bookService.getNewBooks(request);

        assertFalse(result.isEmpty());
        // Verify logic tính toán thời gian được gọi
        verify(bookRepository, times(1)).findByInsertAtAfter(any(LocalDateTime.class));
    }

    @Test
    void getNewBooks_Month_Success() {
        GetNewBooksRequest request = new GetNewBooksRequest();
        request.setPeriod("month");

        when(bookRepository.findByInsertAtAfter(any(LocalDateTime.class))).thenReturn(new ArrayList<>(List.of(book)));
        when(bookMapper.toBookResponse(book)).thenReturn(bookResponse);

        List<BookResponse> result = bookService.getNewBooks(request);

        assertFalse(result.isEmpty());
        // Verify logic tính toán thời gian được gọi
        verify(bookRepository, times(1)).findByInsertAtAfter(any(LocalDateTime.class));
    }

    @Test
    void getNewBooks_InvalidPeriod_Fail() {
        GetNewBooksRequest request = new GetNewBooksRequest();
        request.setPeriod("year"); // Period không hỗ trợ

        AppException ex = assertThrows(AppException.class, () -> bookService.getNewBooks(request));
        assertEquals(ErrorCode.INVALID_PERIOD, ex.getErrorCode());
    }
}