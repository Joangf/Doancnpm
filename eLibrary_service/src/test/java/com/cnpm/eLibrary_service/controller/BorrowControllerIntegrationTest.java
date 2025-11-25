package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.BorrowRequest;
import com.cnpm.eLibrary_service.dto.request.RenewBorrowRequest;
import com.cnpm.eLibrary_service.entity.*;
import com.cnpm.eLibrary_service.entity.enums.Language;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.BorrowRepository;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.UserSubscriptionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Transactional
class BorrowControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @MockitoBean
    private BookEsRepository bookEsRepository;
    @MockitoBean
    private UserSubscriptionService userSubscriptionService;

    private User user;
    private Book book;

    private SubscriptionPlan defaultPlan;
    private UserSubscription defaultSubscription;

    @BeforeEach
    void setup() {
        // 1. Dọn dẹp DB trước mỗi lần chạy
        borrowRepository.deleteAll();
        bookRepository.deleteAll();
        userRepository.deleteAll();
        categoryRepository.deleteAll();

        // 2. Tạo User thật
        user = User.builder()
                .username("test_user")
                .password("password")
                .build();
        user = userRepository.save(user);

        // 3. Tạo Book và Category thật
        Category category = categoryRepository.save(Category.builder().name("IT").build());

        book = Book.builder()
                .title("Clean Architecture")
                .author("Robert C. Martin")
                .publisher("Prentice Hall")
                .publishYear(2017)
                .description("Software structure")
                .language(Language.EN)
                .categories(new HashSet<>(Set.of(category)))
                .build();
        book = bookRepository.save(book);

        // 4. Setup MOCK cho UserSubscriptionService
        // Vì logic mượn sách phụ thuộc vào Service này, nên ta phải giả lập nó trả về gói cước hợp lệ

        defaultPlan = new SubscriptionPlan();
        defaultPlan.setMaxBorrowDays(30);
        defaultPlan.setMaxBorrowNumbers(5);

        defaultSubscription = new UserSubscription();
        defaultSubscription.setSubscriptionPlan(defaultPlan);


        when(userSubscriptionService.getValidSubscription(any(User.class)))
                .thenReturn(defaultSubscription);
    }

    // --- TEST CASE 1: MƯỢN SÁCH THÀNH CÔNG ---
    @Test
    @WithMockUser(username = "test_user")
    void borrowBook_Success() throws Exception {
        BorrowRequest request = BorrowRequest.builder()
                .userId(user.getId()) // ID thật từ DB
                .bookId(book.getId()) // ID thật từ DB
                .borrowDays(14)
                .build();

        mockMvc.perform(post("/api/borrow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.bookTitle").value("Clean Architecture"))
                .andExpect(jsonPath("$.result.returnDateTime").doesNotExist());
    }

    // --- TEST CASE 2: MƯỢN SÁCH ĐÃ MƯỢN (CHƯA TRẢ) -> FAIL ---
    @Test
    @WithMockUser(username = "test_user")
    void borrowBook_AlreadyBorrowed_Fail() throws Exception {
        // Setup: Đã có record mượn trong DB
        Borrow activeBorrow = Borrow.builder()
                .user(user)
                .book(book)
                .borrowDateTime(LocalDateTime.now())
                .dueDateTime(LocalDateTime.now().plusDays(7))
                .returnDateTime(null) // null = chưa trả
                .build();
        borrowRepository.save(activeBorrow);

        // Action: Cố mượn lại đúng quyển đó
        BorrowRequest request = BorrowRequest.builder()
                .userId(user.getId())
                .bookId(book.getId())
                .borrowDays(7)
                .build();

        mockMvc.perform(post("/api/borrow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(ErrorCode.ALREADY_BORROWED.getCode()));
    }

    // --- TEST CASE 3: MƯỢN QUÁ SỐ NGÀY CHO PHÉP -> FAIL ---
    @Test
    @WithMockUser(username = "test_user")
    void borrowBook_ExceedMaxDays_Fail() throws Exception {
        // Override lại Mock: Gói cước chỉ cho mượn tối đa 7 ngày
        defaultPlan.setMaxBorrowDays(7);

        BorrowRequest request = BorrowRequest.builder()
                .userId(user.getId())
                .bookId(book.getId())
                .borrowDays(10) // Xin mượn 10 ngày
                .build();

        mockMvc.perform(post("/api/borrow")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(ErrorCode.BORROWDAYS_LIMIT_EXCEEDED.getCode()));
    }

    // --- TEST CASE 4: TRẢ SÁCH THÀNH CÔNG ---
    @Test
    @WithMockUser(username = "test_user")
    void returnBook_Success() throws Exception {
        // Setup: Tạo khoản vay đang nợ
        Borrow borrow = Borrow.builder()
                .user(user)
                .book(book)
                .borrowDateTime(LocalDateTime.now().minusDays(5))
                .dueDateTime(LocalDateTime.now().plusDays(5))
                .returnDateTime(null)
                .build();
        borrow = borrowRepository.save(borrow);

        mockMvc.perform(put("/api/borrow/" + borrow.getId() + "/return")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.returnDateTime").exists());

        // Kiểm tra DB
        Borrow updatedBorrow = borrowRepository.findById(borrow.getId()).orElseThrow();
        assertNotNull(updatedBorrow.getReturnDateTime());
    }

    // --- TEST CASE 5: GIA HẠN SÁCH ---
    @Test
    @WithMockUser(username = "test_user")
    void renewBorrow_Success() throws Exception {
        // Setup: Khoản vay sắp hết hạn
        Borrow oldBorrow = Borrow.builder()
                .user(user)
                .book(book)
                .borrowDateTime(LocalDateTime.now().minusDays(29))
                .dueDateTime(LocalDateTime.now().plusDays(1))
                .returnDateTime(null)
                .build();
        oldBorrow = borrowRepository.save(oldBorrow);

        RenewBorrowRequest request = new RenewBorrowRequest();
        request.setExtraDays(7);

        mockMvc.perform(put("/api/borrow/" + oldBorrow.getId() + "/renew")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.returnDateTime").doesNotExist()); // Record mới chưa trả

        // Kiểm tra record cũ đã đóng
        Borrow checkOld = borrowRepository.findById(oldBorrow.getId()).orElseThrow();
        assertNotNull(checkOld.getReturnDateTime());

        // Tổng cộng phải có 2 record
        assertEquals(2, borrowRepository.count());
    }
}