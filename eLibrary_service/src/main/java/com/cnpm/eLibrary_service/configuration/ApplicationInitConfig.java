package com.cnpm.eLibrary_service.configuration;

import com.cnpm.eLibrary_service.entity.SubscriptionPlan;
import com.cnpm.eLibrary_service.entity.User;
import com.cnpm.eLibrary_service.entity.enums.Role;
import com.cnpm.eLibrary_service.repository.SubscriptionPlanRepository;
import com.cnpm.eLibrary_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;


@Configuration
@RequiredArgsConstructor
@Slf4j
public class ApplicationInitConfig {
    private final PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(
            UserRepository userRepository,
            SubscriptionPlanRepository planRepository) {
        return args -> {

            if(userRepository.findByUsername("admin").isEmpty()) {
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .role(Role.ADMIN)
                        .build();

                userRepository.save(user);

                log.warn("Created ADMIN");
            }

            if(planRepository.findByName("BASIC").isEmpty()) {
                SubscriptionPlan basic = SubscriptionPlan.builder()
                        .name("BASIC")
                        .maxBorrowNumbers(3)
                        .maxBorrowDays(14)
                        .duration(30) // days
                        .price(BigDecimal.valueOf(0)) // miễn phí
                        .build();

                planRepository.save(basic);
                log.warn("Created BASIC subscription plan");
            }
        };
    }
}
