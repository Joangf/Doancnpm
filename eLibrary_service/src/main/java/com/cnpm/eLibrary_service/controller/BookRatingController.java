package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.RateBookRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.RateBookResponse;
import com.cnpm.eLibrary_service.service.BookRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rating")
@RequiredArgsConstructor
public class BookRatingController {
    private final BookRatingService bookRatingService;
    @PostMapping("/{userId}/{bookId}")
    public ApiResponse<RateBookResponse> rateBook(
            @PathVariable String userId,
            @PathVariable Long bookId,
            @RequestBody RateBookRequest request
    ) {
        return ApiResponse.<RateBookResponse>builder()
                .result(bookRatingService.rateBook(userId,bookId,request))
                .build();
    }

    @DeleteMapping("/{userId}/{bookId}")
    public ApiResponse<String> deleteRating(
            @PathVariable String userId,
            @PathVariable Long bookId
    ) {
        bookRatingService.deleteRating(userId, bookId);
        return ApiResponse.<String>builder()
                .result("Rating deleted successfully")
                .build();
    }
}
