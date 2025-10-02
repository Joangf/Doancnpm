package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.dto.response.ApiResponse;
import com.cnpm.eLibrary_service.dto.response.BorrowResponse;
import com.cnpm.eLibrary_service.service.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/borrow")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;


    @PostMapping
    public ApiResponse<BorrowResponse> borrowBook(@RequestBody BorrowRequest request) {
        return ApiResponse.<BorrowResponse>builder()
                .result(borrowService.borrowBook(request))
                .build();
    }


    @PutMapping("/{id}/return")
    public ApiResponse<BorrowResponse> returnBook(@PathVariable Long id) {
        return ApiResponse.<BorrowResponse>builder()
                .result(borrowService.returnBook(id))
                .build();
    }


    @PutMapping("/{id}/renew")
    public ApiResponse<BorrowResponse> renewBorrow(@PathVariable Long id,
                                                   @RequestBody RenewBorrowRequest request) {
        return ApiResponse.<BorrowResponse>builder()
                .result(borrowService.renewBorrow(id, request))
                .build();
    }

    @GetMapping("/user/{userId}")
    public ApiResponse<Page<BorrowResponse>> getUserBorrows(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<Page<BorrowResponse>>builder()
                .result(borrowService.getUserBorrows(userId, page, size))
                .build();
    }
}
