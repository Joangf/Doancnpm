package com.cnpm.eLibrary_service.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorize exception", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_ID_NOT_EXISTED(1001,"User Id is not existed", HttpStatus.BAD_REQUEST ),
    BOOK_NOT_EXISTED(1002, "Book Id is not existed", HttpStatus.BAD_REQUEST),
    INVALID_OTP(1003, "Invalid Otp code", HttpStatus.BAD_REQUEST),
    USER_EMAIL_NOT_EXISTED(1004, "User email not existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1005, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    USERNAME_NOT_EXISTED(1006, "Username is not existed", HttpStatus.BAD_REQUEST),
    INVALID_OR_EXPIRED_TOKEN(1007, "Invalid token", HttpStatus.BAD_REQUEST),
    PLAN_NOT_EXISTED(1008, "Subscription plan is not existed", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_EXISTED(1009, "Category Id is not existed", HttpStatus.BAD_REQUEST),
    BORROW_NOT_EXISTED(1010, "Borrow Id is not existed", HttpStatus.BAD_REQUEST),
    BORROW_LIMIT_EXCEEDED(1011, "Borrow days excceeded", HttpStatus.BAD_REQUEST),
    BORROW_ALREADY_RETURNED(1012, "Borrw has already returned", HttpStatus.BAD_REQUEST),
    USER_NOT_VERIFIED(1013, "User is not verified", HttpStatus.FORBIDDEN),
    OTP_EXPIRED(1014, "OTP code expired", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1015, "User not found with given username or email", HttpStatus.BAD_REQUEST),
    CATEGORY_NAME_NOT_EXISTED(1016, "Category name is not existed", HttpStatus.BAD_REQUEST),
    ALREADY_BORROWED(1017, "This book has already been borrowed by this user", HttpStatus.BAD_REQUEST),
    BOOK_MUST_HAVE_CATEGORY(1018, "Book must belong to at least one category", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTED(1019, "Username existed", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1020, "Email existed", HttpStatus.BAD_REQUEST)
;
    ErrorCode(int code, String message, HttpStatus statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
    int code;
    String message;
    HttpStatus statusCode;
}
