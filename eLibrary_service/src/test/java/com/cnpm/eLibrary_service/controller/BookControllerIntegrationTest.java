package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.BookFilterRequest;
import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.request.BookSearchingRequest;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.entity.enums.Language;
import com.cnpm.eLibrary_service.es_document.BookEs;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.repository.BookRepository;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.service.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Transactional
class BookControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository; // Cần cái này để tạo data nền

    @Autowired
    private ObjectMapper objectMapper;

    // --- MOCK CÁC SERVICE NGOÀI ---
    @MockitoBean
    private BookEsRepository bookEsRepository;

    @MockitoBean
    private RedisService redisService;


    private Book existingBook;
    private Category categoryIT;

    @BeforeEach
    void setup() {
        // 1. Clean DB
        bookRepository.deleteAll();
        categoryRepository.deleteAll();

        // 2. Tạo Category trước (BẮT BUỘC vì sách phụ thuộc category)
        categoryIT = Category.builder().name("IT").build();
        categoryRepository.save(categoryIT);

        // 3. Tạo Sách mẫu đã link với Category
        existingBook = Book.builder()
                .title("Clean Code")
                .author("Robert C. Martin")
                .publisher("Prentice Hall")
                .publishYear(2008)
                .description("Agile Software Craftsmanship")
                .coverUrl("https://old-cover.url")
                .language(Language.EN)
                .categories(new HashSet<>(Set.of(categoryIT))) // Link category
                .build();

        bookRepository.save(existingBook);
    }

    // --- 1. TEST CREATE BOOK (Admin) ---

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void createBook_Success() throws Exception {
        // [QUAN TRỌNG]: Tạo sẵn các category trong DB mà request sẽ dùng
        categoryRepository.save(Category.builder().name("Programming").build());
        categoryRepository.save(Category.builder().name("Java").build());

        BookRequest request = BookRequest.builder()
                .title("Effective Java")
                .translatedTitle("Java Hiệu Quả")
                .author("Joshua Bloch")
                .publisher("Addison-Wesley")
                .publishYear(2018)
                .language(Language.EN)
                .description("Best practices for Java")
                .categoryNames(Set.of("Programming", "Java")) // Tên category phải khớp DB
                .build();

        mockMvc.perform(post("/api/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.title").value("Effective Java"))
                .andExpect(jsonPath("$.result.categories").isArray()) // Check response có trả về list category
                .andExpect(jsonPath("$.result.id").exists());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void createBook_CategoryNotExist_Fail() throws Exception {
        // Request dùng category "Unknown" chưa có trong DB
        BookRequest request = BookRequest.builder()
                .title("New Book")
                .author("Author")
                .categoryNames(Set.of("Unknown"))
                .build();

        mockMvc.perform(post("/api/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest()) // Expect lỗi 400 hoặc code tương ứng
                .andExpect(jsonPath("$.code").value(1016)); // CATEGORY_NAME_NOT_EXISTED
    }

    // --- 2. TEST GET BOOK (Public/User) ---

    @Test
    @WithMockUser(username = "user")
    void getBook_Success() throws Exception {
        mockMvc.perform(get("/api/book/" + existingBook.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.title").value("Clean Code"))
                .andExpect(jsonPath("$.result.categories[0].name").value("IT")); // Check category
    }

    @Test
    void getBook_NotFound_Fail() throws Exception {
        mockMvc.perform(get("/api/book/999999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").exists());
    }

    // --- 3. TEST UPDATE BOOK (Admin) ---

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void updateBook_Success() throws Exception {
        // Tạo thêm category mới để test update đổi category
        categoryRepository.save(Category.builder().name("Refactoring").build());

        BookRequest request = BookRequest.builder()
                .title("Clean Code (Updated)")
                .author("Robert C. Martin")
                .publisher("New Publisher")
                .publishYear(2009)
                .language(Language.EN)
                .categoryNames(Set.of("IT", "Refactoring")) // Update thêm category
                .build();

        mockMvc.perform(put("/api/book/" + existingBook.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.title").value("Clean Code (Updated)"))
                .andExpect(jsonPath("$.result.categories.length()").value(2));
    }

    // --- 4. TEST DELETE BOOK (Admin) ---

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void deleteBook_Success() throws Exception {
        mockMvc.perform(delete("/api/book/" + existingBook.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").value("Book has been deleted successfully"));

        mockMvc.perform(get("/api/book/" + existingBook.getId()))
                .andExpect(status().isBadRequest());
    }

    // --- 5. TEST GET ALL ---

    @Test
    void getAllBooks_Success() throws Exception {
        // Tạo thêm sách thứ 2 (Phải kèm category)
        Book anotherBook = Book.builder()
                .title("Book 2")
                .author("Author 2")
                .publishYear(2024)
                .categories(new HashSet<>(Set.of(categoryIT))) // Gán category IT
                .build();
        bookRepository.save(anotherBook);

        mockMvc.perform(get("/api/book")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content.length()").value(2));
    }

    @Test
    void search_ByKeyword_Success() throws Exception {
        // 1. Request
        BookSearchingRequest request = new BookSearchingRequest();
        request.setKeyword("Clean Code");

        // 2. Mock kết quả ES
        BookEs resultEs = new BookEs();
        resultEs.setId("100");
        resultEs.setTitle("Clean Code");
        resultEs.setAuthor("Robert C. Martin");
        resultEs.setCategoryIds(Set.of(categoryIT.getId()));

        // 3. Mock Repository
        when(bookEsRepository.searchByKeyword(eq("Clean Code"), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(resultEs)));

        // 4. Perform
        mockMvc.perform(post("/api/book/search")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()) // Giờ sẽ trả về 200 OK
                .andExpect(jsonPath("$.result.content[0].title").value("Clean Code"))
                .andExpect(jsonPath("$.result.totalElements").value(1));
    }

    @Test
    void search_ByKeywordAndCategory_Success() throws Exception {
        // Lấy ID thật từ DB (đừng dùng số cứng 1L vì có thể DB test gen ra số khác)
        Long targetCategoryId = categoryIT.getId();

        // 1. Request
        BookSearchingRequest request = new BookSearchingRequest();
        request.setKeyword("Java");
        request.setCategoryIds(List.of(targetCategoryId));

        // 2. Mock kết quả ES
        BookEs resultEs = new BookEs();
        resultEs.setId("200");
        resultEs.setTitle("Effective Java");
        resultEs.setCategoryIds(Set.of(targetCategoryId));

        // 3. Mock Repository
        // Matcher phải khớp với cái List ID truyền vào
        when(bookEsRepository.searchByKeywordAndCategories(eq("Java"), eq(List.of(targetCategoryId)), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(resultEs)));

        // 4. Perform
        mockMvc.perform(post("/api/book/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content[0].title").value("Effective Java"));
    }

    @Test
    void search_NoResult_Success() throws Exception {
        BookSearchingRequest request = new BookSearchingRequest();
        request.setKeyword("NonExistentBook");

        when(bookEsRepository.searchByKeyword(eq("NonExistentBook"), any(Pageable.class)))
                .thenReturn(new PageImpl<>(Collections.emptyList()));

        mockMvc.perform(post("/api/book/search")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isEmpty())
                .andExpect(jsonPath("$.result.totalElements").value(0));
    }

    @Test
    void filter_ByCategories_Success() throws Exception {
        Long itCategoryId = categoryIT.getId();

        BookFilterRequest request = new com.cnpm.eLibrary_service.dto.request.BookFilterRequest();
        request.setCategoryIds(List.of(itCategoryId));

        mockMvc.perform(post("/api/book/filter")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content[0].title").value("Clean Code"));
    }
}