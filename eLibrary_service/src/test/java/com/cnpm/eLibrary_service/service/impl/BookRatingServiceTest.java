package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.RateBookRequest;
import com.cnpm.eLibrary_service.dto.response.RateBookResponse;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.BookRating;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.BookRatingRepository;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookRatingServiceTest {

    @Mock
    private BookRatingRepository ratingRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookRatingServiceImpl ratingService;

    private User user;
    private Book book;
    private BookRating rating;
    private RateBookRequest rateRequest;

    @BeforeEach
    void setup() {
        user = User.builder()
                .id("user-id-123")
                .username("testuser")
                .build();

        book = Book.builder()
                .id(100L)
                .title("Clean Code")
                .averageRating(0.0)
                .build();

        rating = BookRating.builder()
                .id(1L)
                .user(user)
                .book(book)
                .rating(5)
                .build();

        rateRequest = new RateBookRequest();
        rateRequest.setRating(5);
    }

    // --- 1. TEST RATE BOOK (CREATE & UPDATE) ---

    @Test
    void rateBook_NewRating_Success() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(ratingRepository.findByUserAndBook(user, book)).thenReturn(Optional.empty());

        when(ratingRepository.save(any(BookRating.class))).thenReturn(rating);
        when(ratingRepository.findAverageRatingByBookId(100L)).thenReturn(5.0);
        when(bookRepository.save(book)).thenReturn(book);

        RateBookResponse result = ratingService.rateBook("user-id-123", 100L, rateRequest);

        assertNotNull(result);
        assertEquals(5, result.getRating());
        assertEquals(5.0, result.getAverageRating());

        verify(ratingRepository, times(1)).save(any(BookRating.class));
        verify(bookRepository, times(1)).save(book);
    }

    @Test
    void rateBook_UpdateExistingRating_Success() {
        rateRequest.setRating(4);

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(ratingRepository.findByUserAndBook(user, book)).thenReturn(Optional.of(rating));

        when(ratingRepository.findAverageRatingByBookId(100L)).thenReturn(4.0);

        RateBookResponse result = ratingService.rateBook("user-id-123", 100L, rateRequest);

        assertEquals(4, result.getRating());
        assertEquals(4.0, result.getAverageRating());

        verify(ratingRepository, times(1)).save(rating);
    }

    @Test
    void rateBook_UserNotFound_Fail() {
        when(userRepository.findById("invalid")).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> ratingService.rateBook("invalid", 100L, rateRequest));
        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void rateBook_BookNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> ratingService.rateBook("user-id-123", 999L, rateRequest));
        assertEquals(ErrorCode.BOOK_NOT_EXISTED, ex.getErrorCode());
    }

    // --- 2. TEST DELETE RATING ---

    @Test
    void deleteRating_LastRating_Success() {
        // Case 1: Xóa rating cuối cùng -> AVG trả về NULL -> Gán về 0.0
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(ratingRepository.findByUserAndBook(user, book)).thenReturn(Optional.of(rating));

        // Mock trả về null (không còn rating nào)
        when(ratingRepository.findAverageRatingByBookId(100L)).thenReturn(null);

        ratingService.deleteRating("user-id-123", 100L);

        verify(ratingRepository, times(1)).delete(rating);
        verify(bookRepository, times(1)).save(book);
        assertEquals(0.0, book.getAverageRating()); // Verify logic (avg != null ? avg : 0.0) -> Lấy 0.0
    }

    @Test
    void deleteRating_WithRemainingRatings_Success() {
        // Case 2: Xóa rating nhưng vẫn còn người khác rate -> AVG trả về số thực (VD: 4.5)
        // Case này sẽ cover nhánh "True hits" của (avg != null)
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(ratingRepository.findByUserAndBook(user, book)).thenReturn(Optional.of(rating));

        // Mock trả về 4.5 (vẫn còn rating khác)
        when(ratingRepository.findAverageRatingByBookId(100L)).thenReturn(4.5);

        ratingService.deleteRating("user-id-123", 100L);

        verify(ratingRepository, times(1)).delete(rating);
        verify(bookRepository, times(1)).save(book);
        assertEquals(4.5, book.getAverageRating()); // Verify logic (avg != null ? avg : 0.0) -> Lấy 4.5
    }

    @Test
    void deleteRating_RatingNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(ratingRepository.findByUserAndBook(user, book)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> ratingService.deleteRating("user-id-123", 100L));

        assertEquals(ErrorCode.RATING_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void deleteRating_UserNotFound_Fail() {
        when(userRepository.findById("invalid")).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class,
                () -> ratingService.deleteRating("invalid", 100L));
        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void deleteRating_BookNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(999L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class,
                () -> ratingService.deleteRating("user-id-123", 999L));
        assertEquals(ErrorCode.BOOK_NOT_EXISTED, ex.getErrorCode());
    }
}