package com.cnpm.eLibrary_service.service;

public interface MailService {
    void sendEmail(String to, String subject, String body);

    void sendHtmlEmail(String to, String subject, String htmlBody);
}
