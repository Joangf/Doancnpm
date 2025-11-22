package com.cnpm.eLibrary_service.service.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RedisServiceTest {

    @Mock
    private RedisTemplate<String, String> redisTemplate;

    @Mock
    private ValueOperations<String, String> valueOperations;

    @InjectMocks
    private RedisServiceImpl redisService;

    @BeforeEach
    void setup() {
        // Quan trọng: Mock chuỗi gọi redisTemplate.opsForValue()
        // Nếu không có dòng này sẽ bị NullPointerException
        lenient().when(redisTemplate.opsForValue()).thenReturn(valueOperations);
    }

    @Test
    void setValue_Success() {
        // WHEN
        redisService.setValue("key1", "value1", 100L, TimeUnit.SECONDS);

        // THEN
        verify(valueOperations, times(1)).set("key1", "value1", 100L, TimeUnit.SECONDS);
    }

    @Test
    void getValue_Success() {
        // GIVEN
        when(valueOperations.get("key1")).thenReturn("value1");

        // WHEN
        String result = redisService.getValue("key1");

        // THEN
        assertEquals("value1", result);
    }

    @Test
    void deleteValue_Success() {
        // WHEN
        redisService.deleteValue("key1");

        // THEN
        verify(redisTemplate, times(1)).delete("key1");
    }

    @Test
    void getTtl_Success() {
        // GIVEN
        when(redisTemplate.getExpire("key1", TimeUnit.SECONDS)).thenReturn(50L);

        // WHEN
        Long ttl = redisService.getTtl("key1", TimeUnit.SECONDS);

        // THEN
        assertEquals(50L, ttl);
    }
}