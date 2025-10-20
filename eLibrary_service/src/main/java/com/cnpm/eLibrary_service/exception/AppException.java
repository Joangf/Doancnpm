package com.cnpm.eLibrary_service.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public class AppException extends RuntimeException {
    public AppException(String message) {
        super(message);
    }
    private ErrorCode errorCode;

    public AppException(ErrorCode erroCode) {
        super(erroCode.getMessage());
        this.errorCode = erroCode;
    }

    public ErrorCode getErrorCode() {
        return this.errorCode;
    }
}
