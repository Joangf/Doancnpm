package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.request.BookRequest;
import com.cnpm.eLibrary_service.dto.response.BookResponse;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;
import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BookMapper {
    Book toBook(BookRequest request);
    BookResponse toBookResponse(Book book);

    void updateBook(BookRequest request, @MappingTarget Book book);

    default Set<CategoryResponse> toCategoryResponses(Set<Category> categories) {
        return categories.stream()
                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                .collect(Collectors.toSet());
    }
}
