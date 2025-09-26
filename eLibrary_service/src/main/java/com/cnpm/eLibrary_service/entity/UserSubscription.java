package com.cnpm.eLibrary_service.entity;

import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    LocalDateTime startDateTime;
    LocalDateTime endDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "subscription_plan_id")
    SubscriptionPlan subscriptionPlan;

    @Enumerated(EnumType.STRING)
    SubscriptionStatus status;

    BigDecimal priceAtPurchase;

    LocalDateTime lastReminderSentAt;

}
