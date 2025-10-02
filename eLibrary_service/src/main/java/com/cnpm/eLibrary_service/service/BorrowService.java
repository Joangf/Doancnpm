package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.dto.response.BorrowResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BorrowService {
    BorrowResponse borrowBook(BorrowRequest request);
    BorrowResponse returnBook(Long borrowId);
    BorrowResponse renewBorrow(Long id, RenewBorrowRequest request);
    Page<BorrowResponse> getUserBorrows(String userId, int page, int size);
}
