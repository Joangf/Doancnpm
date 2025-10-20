package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Set<Category> findAllByNameIn(Collection<String> names);
}
