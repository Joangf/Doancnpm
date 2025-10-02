package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.dto.response.BorrowResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.BorrowMapper;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Borrow;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.BorrowRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.BorrowService;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BorrowMapper borrowMapper;
    private final UserSubscriptionService subscriptionService;

    @Override
    public BorrowResponse borrowBook(BorrowRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        if (borrowRepository.existsByUserAndBookAndReturnDateTimeIsNull(user, book)) {
            throw new AppException(ErrorCode.ALREADY_BORROWED);
        }

        // Validate số ngày theo subscription
        UserSubscription sub = subscriptionService.getValidSubscription(user);
        if (request.getBorrowDays() > sub.getSubscriptionPlan().getMaxBorrowDays()) {
            throw new AppException(ErrorCode.BORROW_LIMIT_EXCEEDED);
        }

        LocalDateTime now = LocalDateTime.now();

        Borrow borrow = Borrow.builder()
                .user(user)
                .book(book)
                .borrowDateTime(now)
                .dueDateTime(now.plusDays(request.getBorrowDays()))
                .build();

        borrowRepository.save(borrow);
        return borrowMapper.toBorrowResponse(borrow);
    }

    @Override
    public BorrowResponse returnBook(Long borrowId) {
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_NOT_EXISTED));

        if (borrow.getReturnDateTime() != null) {
            throw new AppException(ErrorCode.BORROW_ALREADY_RETURNED);
        }

        borrow.setReturnDateTime(LocalDateTime.now());
        borrowRepository.save(borrow);

        return borrowMapper.toBorrowResponse(borrow);
    }

    @Override
    public BorrowResponse renewBorrow(Long id, RenewBorrowRequest request) {
        Borrow oldBorrow = borrowRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BORROW_NOT_EXISTED));

        if (oldBorrow.getReturnDateTime() != null) {
            throw new AppException(ErrorCode.BORROW_ALREADY_RETURNED);
        }

        User user = oldBorrow.getUser();

        // Validate số ngày theo subscription
        UserSubscription sub = subscriptionService.getValidSubscription(user);
        if (request.getExtraDays() > sub.getSubscriptionPlan().getMaxBorrowDays()) {
            throw new AppException(ErrorCode.BORROW_LIMIT_EXCEEDED);
        }

        // Đánh dấu borrow cũ đã return
        oldBorrow.setReturnDateTime(LocalDateTime.now());
        borrowRepository.save(oldBorrow);

        // Tạo borrow mới
        Borrow newBorrow = Borrow.builder()
                .user(user)
                .book(oldBorrow.getBook())
                .borrowDateTime(LocalDateTime.now())
                .dueDateTime(LocalDateTime.now().plusDays(request.getExtraDays()))
                .build();

        borrowRepository.save(newBorrow);

        return borrowMapper.toBorrowResponse(newBorrow);
    }

    @Override
    public Page<BorrowResponse> getUserBorrows(String userId, int page, int size) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        Pageable pageable = PageRequest.of(page,size);

        return borrowRepository.findAllByUser(user,pageable)
                .map(borrowMapper::toBorrowResponse);
    }
}
