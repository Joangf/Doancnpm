package com.cnpm.eLibrary_service.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @InjectMocks
    private MailServiceImpl mailService;

    @Test
    void sendEmail_Success() {
        // GIVEN
        String to = "test@example.com";
        String subject = "Test Subject";
        String body = "Hello World";

        // WHEN
        mailService.sendEmail(to, subject, body);

        // THEN
        // Dùng ArgumentCaptor để bắt lấy cái message thực sự được gửi đi
        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender, times(1)).send(messageCaptor.capture());

        SimpleMailMessage sentMessage = messageCaptor.getValue();

        // Kiểm tra nội dung bên trong
        assertEquals(to, Objects.requireNonNull(sentMessage.getTo())[0]);
        assertEquals(subject, sentMessage.getSubject());
        assertEquals(body, sentMessage.getText());
    }

    @Test
    void sendHtmlEmail_Success() {
        // GIVEN
        String to = "test@example.com";
        String subject = "HTML Subject";
        String htmlBody = "<h1>Hello</h1>";

        // Mock hành vi tạo MimeMessage
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);

        // WHEN
        mailService.sendHtmlEmail(to, subject, htmlBody);

        // THEN
        verify(mailSender, times(1)).send(mimeMessage);
    }
}