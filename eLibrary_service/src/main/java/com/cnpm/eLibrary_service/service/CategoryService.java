package com.cnpm.eLibrary_service.service;

import com.cnpm.eLibrary_service.dto.request.CategoryRequest;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest request);
    CategoryResponse getCategory(Long id);
    List<CategoryResponse> getAllCategories();
    CategoryResponse updateCategory(Long id, CategoryRequest request);
    void deleteCategory(Long id);
}
