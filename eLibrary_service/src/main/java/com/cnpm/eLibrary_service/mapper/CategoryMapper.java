package com.cnpm.eLibrary_service.mapper;

import com.cnpm.eLibrary_service.dto.request.CategoryRequest;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;
import com.cnpm.eLibrary_service.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CategoryMapper {
    Category toCategory(CategoryRequest request);
    CategoryResponse toCategoryResponse(Category category);

    void updateCategory(CategoryRequest request, @MappingTarget Category category);
}
