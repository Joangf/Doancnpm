package com.cnpm.eLibrary_service.scheduler;

import com.cnpm.eLibrary_service.entity.UserSubscription;
import com.cnpm.eLibrary_service.entity.enums.SubscriptionStatus;
import com.cnpm.eLibrary_service.repository.UserSubscriptionRepository;
import com.cnpm.eLibrary_service.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserSubscriptionScheduler {

    private final UserSubscriptionRepository subscriptionRepository;
    private final MailService mailService;


    @Scheduled(cron = "0 0 * * * *")
    public void cleanupExpiredSubscriptions() {
        LocalDateTime now = LocalDateTime.now();
        List<UserSubscription> expiredSubs =
                subscriptionRepository.findByEndDateTimeBeforeAndStatusAndLastReminderSentAtIsNull(now, SubscriptionStatus.ACTIVE);

        for (UserSubscription sub : expiredSubs) {
            sub.setStatus(SubscriptionStatus.EXPIRED);
            subscriptionRepository.save(sub);

            log.info("Subscription {} for user {} expired", sub.getId(), sub.getUser().getUsername());

            mailService.sendHtmlEmail(
                    sub.getUser().getEmail(),
                    "Subscription expired",
                    "<h2>Xin chào " + sub.getUser().getUsername() + "</h2>" +
                            "<p>Gói <b>" + sub.getSubscriptionPlan().getName() + "</b> của bạn đã <span style='color:red;'>hết hạn</span>.</p>" +
                            "<p>Vui lòng gia hạn để tiếp tục sử dụng.</p>"
            );
        }
    }


    @Scheduled(cron = "0 30 * * * *")
    public void remindExpiringSubscriptions() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime threshold = now.plusDays(3);

        List<UserSubscription> expiringSubs =
                subscriptionRepository.findByEndDateTimeBeforeAndStatusAndLastReminderSentAtIsNull(
                        threshold, SubscriptionStatus.ACTIVE
                );

        for (UserSubscription sub : expiringSubs) {
            if (sub.getEndDateTime().isAfter(now)) {
                mailService.sendHtmlEmail(
                        sub.getUser().getEmail(),
                        "Subscription expiring soon",
                        "<h2>Xin chào " + sub.getUser().getUsername() + "</h2>" +
                                "<p>Gói <b>" + sub.getSubscriptionPlan().getName() + "</b> của bạn sẽ hết hạn vào <b>" +
                                sub.getEndDateTime().toLocalDate() + "</b>.</p>"
                );

                sub.setLastReminderSentAt(now);
                subscriptionRepository.save(sub);
            }
        }

    }
}
