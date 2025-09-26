package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.CategoryRequest;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.CategoryMapper;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import com.cnpm.eLibrary_service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = categoryMapper.toCategory(request);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse getCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
    }

    @Override
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        categoryMapper.updateCategory(request, category);
        categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(category);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        categoryRepository.delete(category);
    }
}
