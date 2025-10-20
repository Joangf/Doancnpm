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
    @Mapping(source = "book.author", target = "bookAuthor")
    @Mapping(source = "book.publisher", target = "bookPublisher")
    @Mapping(source = "book.publishYear", target = "bookPublishYear")
    @Mapping(source = "book.description", target = "bookDescription")
    @Mapping(source = "book.pdfUrl", target = "bookPdfUrl")
    @Mapping(source = "book.coverUrl", target = "bookCoverUrl")
    BorrowResponse toBorrowResponse(Borrow borrow);
}
