package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @EntityGraph(attributePaths = "categories")
    Page<Book> findAll(Pageable pageable);

    Page<Book> findDistinctByCategories_IdIn(List<Long> categoryIds, Pageable pageable);

    Page<Book> findDistinctByCategoriesIn(List<Category> categories, Pageable pageable);
}
