package com.cnpm.eLibrary_service.service.impl;

import com.cnpm.eLibrary_service.dto.request.CategoryRequest;
import com.cnpm.eLibrary_service.dto.response.CategoryResponse;
import com.cnpm.eLibrary_service.entity.Category;
import com.cnpm.eLibrary_service.exception.AppException;
import com.cnpm.eLibrary_service.exception.ErrorCode;
import com.cnpm.eLibrary_service.mapper.CategoryMapper;
import com.cnpm.eLibrary_service.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private CategoryMapper categoryMapper;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Category category;
    private CategoryRequest request;
    private CategoryResponse response;

    @BeforeEach
    void setup() {
        category = Category.builder()
                .id(1L)
                .name("Science Fiction")
                .build();

        request = new CategoryRequest("Science Fiction");

        response = CategoryResponse.builder()
                .id(1L)
                .name("Science Fiction")
                .build();
    }

    @Test
    void createCategory_Success() {
        when(categoryMapper.toCategory(request)).thenReturn(category);
        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toCategoryResponse(category)).thenReturn(response);

        CategoryResponse result = categoryService.createCategory(request);

        assertNotNull(result);
        assertEquals("Science Fiction", result.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void getCategory_Success() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryMapper.toCategoryResponse(category)).thenReturn(response);

        CategoryResponse result = categoryService.getCategory(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    void getCategory_NotFound_Fail() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> categoryService.getCategory(99L));
        assertEquals(ErrorCode.CATEGORY_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void getAllCategories_Success() {
        when(categoryRepository.findAll()).thenReturn(List.of(category));
        when(categoryMapper.toCategoryResponse(category)).thenReturn(response);

        List<CategoryResponse> result = categoryService.getAllCategories();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    void updateCategory_Success() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toCategoryResponse(category)).thenReturn(response);

        // Mock mapper update void
        doAnswer(invocation -> {
            CategoryRequest req = invocation.getArgument(0);
            Category cat = invocation.getArgument(1);
            cat.setName(req.getName());
            return null;
        }).when(categoryMapper).updateCategory(request, category);

        CategoryResponse result = categoryService.updateCategory(1L, request);

        assertEquals("Science Fiction", result.getName());
        verify(categoryRepository, times(1)).save(category);
    }

    @Test
    void updateCategory_NotFound_Fail() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> categoryService.updateCategory(99L, request));
        assertEquals(ErrorCode.CATEGORY_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    void deleteCategory_Success() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));

        categoryService.deleteCategory(1L);

        verify(categoryRepository, times(1)).delete(category);
    }

    @Test
    void deleteCategory_NotFound_Fail() {
        when(categoryRepository.findById(99L)).thenReturn(Optional.empty());

        AppException ex = assertThrows(AppException.class, () -> categoryService.deleteCategory(99L));
        assertEquals(ErrorCode.CATEGORY_NOT_EXISTED, ex.getErrorCode());
    }
}