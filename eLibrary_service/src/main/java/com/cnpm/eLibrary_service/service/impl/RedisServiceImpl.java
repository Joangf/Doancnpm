package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {
    private final RedisTemplate<String, String > redisTemplate;


    @Override
    public void setValue(String key, String value, Long duration, TimeUnit unit) {
        redisTemplate.opsForValue().set(key,value,duration,unit);
    }

    @Override
    public String getValue(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    @Override
    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }
}
