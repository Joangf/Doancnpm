package com.cnpm.eLibrary_service.scheduler;

import com.cnpm.eLibrary_service.entity.Borrow;
import com.cnpm.eLibrary_service.repository.BorrowRepository;
import com.cnpm.eLibrary_service.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class BorrowScheduler {

    private final BorrowRepository borrowRepository;
    private final MailService mailService;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    // chạy mỗi 0h

    @Scheduled(cron = "0 0 * * * *")
    public void checkDueBorrows() {
        LocalDateTime now = LocalDateTime.now();

        // khoảng ngày mai
        LocalDateTime tomorrowStart = now.plusDays(1).toLocalDate().atStartOfDay();
        LocalDateTime tomorrowEnd = tomorrowStart.plusDays(1);

        // Nhắc nhở trước 1 ngày
        List<Borrow> reminders = borrowRepository
                .findByDueDateTimeBetweenAndReturnDateTimeIsNullAndLastReminderSentAtIsNull(
                        tomorrowStart, tomorrowEnd
                );
        reminders.forEach(borrow -> sendReminder(borrow, borrow.getDueDateTime()));

        // Quá hạn
        List<Borrow> overDue = borrowRepository.findByReturnDateTimeIsNullAndDueDateTimeBefore(now);
        overDue.forEach(borrow -> handleOverdue(borrow, borrow.getDueDateTime()));
    }


    private void sendReminder(Borrow borrow, LocalDateTime due) {
        String to = borrow.getUser().getEmail();
        String subject = "Nhắc nhở trả sách";
        String body = String.format(
                "Bạn đã mượn sách '%s'. Hạn trả là vào lúc %s. Vui lòng trả sách đúng hạn.",
                borrow.getBook().getTitle(),
                due.format(formatter)
        );

        mailService.sendEmail(to, subject, body);
        log.info("Sent reminder to {}", to);

        borrow.setLastReminderSentAt(LocalDateTime.now());
        borrowRepository.save(borrow);

    }

    private void handleOverdue(Borrow borrow, LocalDateTime due) {
        String to = borrow.getUser().getEmail();
        String subject = "Quá hạn trả sách";
        String body = String.format(
                "Bạn đã mượn sách '%s' nhưng đã quá hạn vào lúc %s. Sách đã bị thu hồi.",
                borrow.getBook().getTitle(),
                due.format(formatter)
        );

        mailService.sendEmail(to, subject, body);
        log.info("Overdue borrow for {}", to);

        borrow.setReturnDateTime(LocalDateTime.now());
        borrowRepository.save(borrow);
    }
}
