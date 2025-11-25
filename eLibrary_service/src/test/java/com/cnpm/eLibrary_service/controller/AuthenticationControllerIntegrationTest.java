package com.cnpm.eLibrary_service.controller;

import com.cnpm.eLibrary_service.dto.request.IntrospectRequest;
import com.cnpm.eLibrary_service.dto.request.LoginRequest;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.enums.Role;
import com.cnpm.eLibrary_service.repository.UserRepository;
import com.cnpm.eLibrary_service.es_repository.BookEsRepository;
import com.cnpm.eLibrary_service.service.MailService;
import com.cnpm.eLibrary_service.service.RedisService;
import com.cnpm.eLibrary_service.service.VerificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
// Import mới thay cho MockBean cũ
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Transactional
class AuthenticationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean // <--- THÊM CÁI NÀY
    private RedisService redisService;

    @MockitoBean
    private BookEsRepository bookEsRepository;

    @MockitoBean // <--- THÊM CÁI NÀY
    private MailService mailService;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();

        User user = User.builder()
                .username("testuser")
                .password(passwordEncoder.encode("password123"))
                .email("test@example.com")
                .role(Role.USER)
                .isVerified(true)
                .build();
        userRepository.save(user);
    }

    // --- 1. TEST LOGIN ---

    @Test
    void login_Success() throws Exception {
        LoginRequest request = new LoginRequest("testuser", "password123");
        String content = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.token").exists())
                .andExpect(jsonPath("$.result.authenticated").value(true));
    }

    @Test
    void login_WrongPassword_Fail() throws Exception {
        LoginRequest request = new LoginRequest("testuser", "wrongpass");
        String content = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.code").value(1005));
    }

    @Test
    void login_UserNotVerified_Fail() throws Exception {
        User unverifiedUser = User.builder()
                .username("newuser")
                .password(passwordEncoder.encode("123456"))
                .email("new@example.com")
                .isVerified(false)
                .build();
        userRepository.save(unverifiedUser);

        LoginRequest request = new LoginRequest("newuser", "123456");
        String content = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.code").value(1013))
                .andExpect(jsonPath("$.message").value("User is not verified"));
    }

    // --- 2. TEST INTROSPECT (Kiểm tra token) ---

    @Test
    void introspect_ValidToken_Success() throws Exception {
        // 1. Login để lấy token
        LoginRequest loginReq = new LoginRequest("testuser", "password123");
        String loginRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andReturn().getResponse().getContentAsString();

        String token = objectMapper.readTree(loginRes).get("result").get("token").asText();

        var introspectReq = new IntrospectRequest(token);

        mockMvc.perform(post("/api/auth/introspect")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(introspectReq))) // Dùng ObjectMapper
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.valid").value(true));
    }

    @Test
    void introspect_InvalidToken_Fail() throws Exception {
        String content = "{\"token\": \"invalid.token.here\"}";

        mockMvc.perform(post("/api/auth/introspect")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.valid").value(false));
    }

    // --- 3. TEST LOGOUT ---

    @Test
    void logout_Success() throws Exception {
        LoginRequest loginReq = new LoginRequest("testuser", "password123");
        String loginRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(loginRes).get("result").get("token").asText();

        String logoutContent = "{\"token\": \"" + token + "\"}";

        mockMvc.perform(post("/api/auth/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(logoutContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").value("Logout thành công"));
    }

    // --- 4. TEST REFRESH TOKEN ---

    @Test
    void refreshToken_Success() throws Exception {
        LoginRequest loginReq = new LoginRequest("testuser", "password123");
        String loginRes = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq)))
                .andReturn().getResponse().getContentAsString();
        String token = objectMapper.readTree(loginRes).get("result").get("token").asText();

        String refreshContent = "{\"token\": \"" + token + "\"}";

        mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(refreshContent))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.token").exists())
                .andExpect(jsonPath("$.result.token").isString());
    }
}