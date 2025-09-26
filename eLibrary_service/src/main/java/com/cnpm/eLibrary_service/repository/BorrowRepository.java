package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.Borrow;
import com.cnpm.eLibrary_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow,Long> {
    List<Borrow> findAllByUser(User user);

    @Query("SELECT b FROM Borrow b " +
            "WHERE b.returnDateTime IS NULL " +
            "AND b.dueDateTime >= :startOfDay " +
            "AND b.dueDateTime < :endOfDay")
    List<Borrow> findBorrowsDueOn(LocalDateTime startOfDay, LocalDateTime endOfDay);


    List<Borrow> findByDueDateTimeBetweenAndReturnDateTimeIsNullAndLastReminderSentAtIsNull(
            LocalDateTime start, LocalDateTime end
    );

    List<Borrow> findByReturnDateTimeIsNullAndDueDateTimeBefore(LocalDateTime now);
}
