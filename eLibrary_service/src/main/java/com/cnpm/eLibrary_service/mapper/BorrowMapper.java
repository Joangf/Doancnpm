package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.response.BorrowResponse;
import com.cnpm.eLibrary_service.entity.Borrow;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BorrowMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "book.id", target = "bookId")
    @Mapping(source = "book.title", target = "bookTitle")
    BorrowResponse toBorrowResponse(Borrow borrow);
}
