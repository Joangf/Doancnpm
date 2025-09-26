package com.cnpm.eLibrary_service.repository;

import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, Long> {
    List<UserSubscription> findByUserAndStatus(User user, SubscriptionStatus status);
    List<UserSubscription> findByEndDateTimeBeforeAndStatusAndLastReminderSentAtIsNull(LocalDateTime now, SubscriptionStatus status);
    List<UserSubscription> findByUser(User user);
    @Query("SELECT us FROM UserSubscription us " +
            "WHERE us.user = :user AND us.subscriptionPlan.name = 'BASIC'")
    Optional<UserSubscription> findBasicPlan(@Param("user") User user);

}
