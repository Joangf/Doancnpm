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
import com.cnpm.eLibrary_service.service.BookRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookRatingServiceImpl implements BookRatingService {
    private final BookRatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Override
    public RateBookResponse rateBook(String userId, Long bookId, RateBookRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_ID_NOT_EXISTED));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new AppException(ErrorCode.BOOK_NOT_EXISTED));

        var existingRatingOpt = ratingRepository.findByUserAndBook(user,book);

        BookRating ratingEntity;
        if (existingRatingOpt.isPresent()) {
            ratingEntity = existingRatingOpt.get();
            ratingEntity.setRating(request.getRating());
            ratingEntity.setUpdateAt(LocalDateTime.now());
        } else {
            ratingEntity = BookRating.builder()
                    .rating(request.getRating())
                    .ratingAt(LocalDateTime.now())
                    .user(user)
                    .book(book)
                    .build();
        }

        ratingRepository.save(ratingEntity);

        Double avg = ratingRepository.findAverageRatingByBookId(book.getId());
        book.setAverageRating(avg != null ? avg : 0.0);
        bookRepository.save(book);

        return RateBookResponse.builder()
                .userId(user.getId())
                .bookId(book.getId())
                .rating(ratingEntity.getRating())
                .averageRating(book.getAverageRating())
                .build();
    }
}
