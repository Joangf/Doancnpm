package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
