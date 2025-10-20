package com.cnpm.eLibrary_service.service;

import java.util.concurrent.TimeUnit;

public interface RedisService {
    void setValue(String key, String value, Long duration, TimeUnit unit);
    String getValue(String key);
    void deleteValue(String key);
    Long getTtl(String key, TimeUnit unit);
}
