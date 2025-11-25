package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.CreateUserRequest;
import com.cnpm.eLibrary_service.dto.request.UpdateUserRequest;
import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Transactional
public class UserControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubscriptionPlanRepository planRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    // Mock các service phụ trợ để tránh lỗi kết nối hoặc gửi mail thật
    @MockitoBean
    private RedisService redisService;

    @MockitoBean
    private BookEsRepository bookEsRepository;

    @MockitoBean
    private MailService mailService;

    private User existingUser;

    @BeforeEach
    void setup() {
        // 1. Clean data cũ
        userRepository.deleteAll();
        planRepository.deleteAll();

        // 2. Tạo gói Subscription "BASIC" (BẮT BUỘC vì logic createUser cần nó)
        SubscriptionPlan basicPlan = SubscriptionPlan.builder()
                .name("BASIC")
                .price(BigDecimal.valueOf(0))
                .duration(30)
                .build();
        planRepository.save(basicPlan);

        // 3. Tạo một user mẫu
        existingUser = User.builder()
                .username("testuser")
                .password(passwordEncoder.encode("password123"))
                .email("test@example.com")
                .isVerified(true)
                .build();
        userRepository.save(existingUser);
    }

    // --- 1. TEST CREATE USER (Đăng ký) ---

    @Test
    void createUser_Success() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setUsername("newuser");
        request.setPassword("12345678");
        request.setEmail("newuser@example.com");
        request.setFirstName("Nguyen");
        request.setLastName("Van A");

        String content = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.username").value("newuser"))
                .andExpect(jsonPath("$.result.email").value("newuser@example.com"))
                .andExpect(jsonPath("$.result.id").exists()); // ID được tạo tự động
    }

    @Test
    void createUser_UsernameExisted_Fail() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setUsername("testuser"); // Trùng với existingUser
        request.setPassword("12345678");
        request.setEmail("diff@example.com");

        mockMvc.perform(post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(1019)); // Code USERNAME_EXISTED
    }

    @Test
    void createUser_EmailExisted_Fail() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setUsername("diffuser");
        request.setPassword("12345678");
        request.setEmail("test@example.com"); // Trùng với existingUser

        mockMvc.perform(post("/api/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(1020)); // Code EMAIL_EXISTED (giả định code)
    }

    // --- 2. TEST GET MY INFO (Yêu cầu Authentication) ---

    @Test
    @WithMockUser(username = "testuser") // Giả lập user đã login thành công
    void getMyInfo_Success() throws Exception {
        mockMvc.perform(get("/api/user/my-info")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.username").value("testuser"))
                .andExpect(jsonPath("$.result.email").value("test@example.com"));
    }

    @Test
    void getMyInfo_Unauthenticated_Fail() throws Exception {
        // Không có @WithMockUser -> coi như chưa login
        mockMvc.perform(get("/api/user/my-info")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized()) // 401
                .andExpect(jsonPath("$.code").value(1005)); // UNAUTHENTICATED
    }

    // --- 3. TEST UPDATE USER ---

    @Test
    @WithMockUser(username = "testuser")
    void updateUser_Success() throws Exception {
        UpdateUserRequest request = new UpdateUserRequest();
        request.setFirstName("Updated Name");

        mockMvc.perform(put("/api/user/" + existingUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.firstName").value("Updated Name"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void updateUser_UserNotFound_Fail() throws Exception {
        UpdateUserRequest request = new UpdateUserRequest();
        request.setFirstName("Name");

        mockMvc.perform(put("/api/user/invalid-id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(1001)); // USER_ID_NOT_EXISTED (giả định)
    }

    // --- 4. TEST GET ALL USERS (Pagination) ---

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"}) // Giả sử chỉ admin mới được xem list
    void getAllUsers_Success() throws Exception {
        mockMvc.perform(get("/api/user")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isArray())
                .andExpect(jsonPath("$.result.content[0].username").value("testuser"));
    }
}
