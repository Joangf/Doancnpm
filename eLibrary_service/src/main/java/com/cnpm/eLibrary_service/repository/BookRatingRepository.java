package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.Book;
import com.cnpm.eLibrary_service.entity.BookRating;
import com.cnpm.eLibrary_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRatingRepository extends JpaRepository<BookRating, Long> {
    Optional<BookRating> findByUserAndBook(User user, Book book);

    @Query("SELECT AVG(br.rating) FROM BookRating br WHERE br.book.id = :bookId")
    Double findAverageRatingByBookId(@Param("bookId") Long bookId);
}
