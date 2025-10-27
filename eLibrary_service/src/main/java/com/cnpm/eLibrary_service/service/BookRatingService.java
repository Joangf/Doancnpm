package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.RateBookRequest;
import com.cnpm.eLibrary_service.dto.response.RateBookResponse;

public interface BookRatingService {
    RateBookResponse rateBook(String userId, Long bookId, RateBookRequest request);
}
