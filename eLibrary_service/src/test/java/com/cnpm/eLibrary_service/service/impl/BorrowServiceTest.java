package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.dto.response.BorrowResponse;
import com.cnpm.eLibrary_service.entity.*;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.BorrowMapper;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.BorrowRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BorrowServiceTest {

    @Mock private BorrowRepository borrowRepository;
    @Mock private UserRepository userRepository;
    @Mock private BookRepository bookRepository;
    @Mock private BorrowMapper borrowMapper;
    @Mock private UserSubscriptionService subscriptionService;

    @InjectMocks
    private BorrowServiceImpl borrowService;

    private User user;
    private Book book;
    private BorrowRequest borrowRequest;
    private BorrowResponse borrowResponse;
    private UserSubscription activeSubscription;
    private SubscriptionPlan plan;
    private Borrow borrow;

    @BeforeEach
    void setup() {
        user = User.builder().id("user-id-123").username("testuser").build();
        book = Book.builder().id(100L).title("Clean Code").build();

        plan = SubscriptionPlan.builder()
                .name("PREMIUM")
                .maxBorrowDays(14)       // Max 14 ngày
                .maxBorrowNumbers(5)     // Max 5 cuốn
                .build();

        activeSubscription = UserSubscription.builder()
                .user(user)
                .subscriptionPlan(plan)
                .build();

        borrowRequest = new BorrowRequest("user-id-123", 100L, 7); // Mượn 7 ngày (Valid)

        borrow = Borrow.builder()
                .id(1L)
                .user(user)
                .book(book)
                .borrowDateTime(LocalDateTime.now())
                .dueDateTime(LocalDateTime.now().plusDays(7))
                .build();

        borrowResponse = BorrowResponse.builder()
                .id(1L)
                .bookTitle("Clean Code")
                .build();
    }

    // --- 1. TEST BORROW BOOK ---

    @Test
    void borrowBook_Success() {
        // GIVEN
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));

        // Chưa mượn cuốn này
        when(borrowRepository.existsByUserAndBookAndReturnDateTimeIsNull(user, book)).thenReturn(false);

        // Subscription hợp lệ
        when(subscriptionService.getValidSubscription(user)).thenReturn(activeSubscription);

        // Chưa vượt quá số lượng (đang mượn 0 cuốn)
        when(borrowRepository.countByUserAndReturnDateTimeIsNull(user)).thenReturn(0L);

        when(borrowRepository.save(any(Borrow.class))).thenReturn(borrow);
        when(borrowMapper.toBorrowResponse(any(Borrow.class))).thenReturn(borrowResponse);

        // WHEN
        BorrowResponse result = borrowService.borrowBook(borrowRequest);

        // THEN
        assertNotNull(result);
        verify(borrowRepository, times(1)).save(any(Borrow.class));
    }

    @Test
    void borrowBook_UserNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> borrowService.borrowBook(borrowRequest));
        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void borrowBook_BookNotFound_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> borrowService.borrowBook(borrowRequest));
        assertEquals(ErrorCode.BOOK_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void borrowBook_AlreadyBorrowed_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        // Đã mượn và chưa trả
        when(borrowRepository.existsByUserAndBookAndReturnDateTimeIsNull(user, book)).thenReturn(true);

        AppException ex = assertThrows(AppException.class, () -> borrowService.borrowBook(borrowRequest));
        assertEquals(ErrorCode.ALREADY_BORROWED, ex.getErrorCode());
    }

    @Test
    void borrowBook_DaysLimitExceeded_Fail() {
        // Request mượn 20 ngày > Max 14 ngày của gói
        BorrowRequest invalidRequest = new BorrowRequest("user-id-123", 100L, 20);

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(borrowRepository.existsByUserAndBookAndReturnDateTimeIsNull(user, book)).thenReturn(false);
        when(subscriptionService.getValidSubscription(user)).thenReturn(activeSubscription);

        AppException ex = assertThrows(AppException.class, () -> borrowService.borrowBook(invalidRequest));
        assertEquals(ErrorCode.BORROWDAYS_LIMIT_EXCEEDED, ex.getErrorCode());
    }

    @Test
    void borrowBook_NumberLimitExceeded_Fail() {
        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(bookRepository.findById(100L)).thenReturn(Optional.of(book));
        when(borrowRepository.existsByUserAndBookAndReturnDateTimeIsNull(user, book)).thenReturn(false);
        when(subscriptionService.getValidSubscription(user)).thenReturn(activeSubscription);

        // Đang mượn 5 cuốn = Max 5 cuốn -> Không được mượn thêm
        when(borrowRepository.countByUserAndReturnDateTimeIsNull(user)).thenReturn(5L);

        AppException ex = assertThrows(AppException.class, () -> borrowService.borrowBook(borrowRequest));
        assertEquals(ErrorCode.BORROWNUM_LIMIT_EXCEEDED, ex.getErrorCode());
    }

    // --- 2. TEST RETURN BOOK ---

    @Test
    void returnBook_Success() {
        // GIVEN: Borrow chưa trả (ReturnDateTime = null)
        borrow.setReturnDateTime(null);
        when(borrowRepository.findById(1L)).thenReturn(Optional.of(borrow));
        when(borrowRepository.save(borrow)).thenReturn(borrow);
        when(borrowMapper.toBorrowResponse(borrow)).thenReturn(borrowResponse);

        // WHEN
        BorrowResponse result = borrowService.returnBook(1L);

        // THEN
        assertNotNull(result);
        assertNotNull(borrow.getReturnDateTime()); // Phải được set ngày trả
        verify(borrowRepository, times(1)).save(borrow);
    }

    @Test
    void returnBook_NotFound_Fail() {
        when(borrowRepository.findById(99L)).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> borrowService.returnBook(99L));
        assertEquals(ErrorCode.BORROW_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void returnBook_AlreadyReturned_Fail() {
        // GIVEN: Borrow đã trả rồi
        borrow.setReturnDateTime(LocalDateTime.now());
        when(borrowRepository.findById(1L)).thenReturn(Optional.of(borrow));

        AppException ex = assertThrows(AppException.class, () -> borrowService.returnBook(1L));
        assertEquals(ErrorCode.BORROW_ALREADY_RETURNED, ex.getErrorCode());
    }

    // --- 3. TEST RENEW BORROW (Gia hạn) ---

    @Test
    void renewBorrow_Success() {
        // GIVEN
        RenewBorrowRequest renewRequest = new RenewBorrowRequest(7); // Gia hạn thêm 7 ngày
        borrow.setReturnDateTime(null); // Chưa trả

        when(borrowRepository.findById(1L)).thenReturn(Optional.of(borrow));
        when(subscriptionService.getValidSubscription(user)).thenReturn(activeSubscription);

        // Mock save borrow cũ và tạo borrow mới
        when(borrowRepository.save(any(Borrow.class))).thenReturn(borrow);
        when(borrowMapper.toBorrowResponse(any(Borrow.class))).thenReturn(borrowResponse);

        // WHEN
        BorrowResponse result = borrowService.renewBorrow(1L, renewRequest);

        // THEN
        assertNotNull(result);
        // 1. Borrow cũ phải được trả
        assertNotNull(borrow.getReturnDateTime());
        // 2. Phải gọi save 2 lần (1 lần đóng cũ, 1 lần tạo mới)
        verify(borrowRepository, times(2)).save(any(Borrow.class));
    }

    @Test
    void renewBorrow_DaysLimitExceeded_Fail() {
        RenewBorrowRequest renewRequest = new RenewBorrowRequest(20); // 20 ngày > Max 14
        borrow.setReturnDateTime(null);

        when(borrowRepository.findById(1L)).thenReturn(Optional.of(borrow));
        when(subscriptionService.getValidSubscription(user)).thenReturn(activeSubscription);

        AppException ex = assertThrows(AppException.class, () -> borrowService.renewBorrow(1L, renewRequest));
        assertEquals(ErrorCode.BORROWDAYS_LIMIT_EXCEEDED, ex.getErrorCode());
    }

    @Test
    void renewBorrow_AlreadyReturned_Fail() {
        RenewBorrowRequest renewRequest = new RenewBorrowRequest(7);
        borrow.setReturnDateTime(LocalDateTime.now()); // Đã trả rồi thì ko gia hạn được

        when(borrowRepository.findById(1L)).thenReturn(Optional.of(borrow));

        AppException ex = assertThrows(AppException.class, () -> borrowService.renewBorrow(1L, renewRequest));
        assertEquals(ErrorCode.BORROW_ALREADY_RETURNED, ex.getErrorCode());
    }

    // --- 4. TEST GET USER BORROWS ---

    @Test
    void getUserBorrows_Success() {
        Page<Borrow> page = new PageImpl<>(List.of(borrow));

        when(userRepository.findById("user-id-123")).thenReturn(Optional.of(user));
        when(borrowRepository.findAllByUser(eq(user), any(Pageable.class))).thenReturn(page);
        when(borrowMapper.toBorrowResponse(borrow)).thenReturn(borrowResponse);

        Page<BorrowResponse> result = borrowService.getUserBorrows("user-id-123", 0, 10);

        assertEquals(1, result.getTotalElements());
    }

    @Test
    void getUserBorrows_UserNotFound_Fail() {
        when(userRepository.findById("invalid")).thenReturn(Optional.empty());
        AppException ex = assertThrows(AppException.class, () -> borrowService.getUserBorrows("invalid", 0, 10));
        assertEquals(ErrorCode.USER_ID_NOT_EXISTED, ex.getErrorCode());
    }
}