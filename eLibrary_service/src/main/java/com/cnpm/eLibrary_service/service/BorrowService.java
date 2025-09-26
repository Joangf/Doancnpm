package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.dto.response.BorrowResponse;

import java.util.List;

public interface BorrowService {
    BorrowResponse borrowBook(BorrowRequest request);
    BorrowResponse returnBook(Long borrowId);
    BorrowResponse renewBorrow(Long id, RenewBorrowRequest request);
    List<BorrowResponse> getUserBorrows(String userId);
}
