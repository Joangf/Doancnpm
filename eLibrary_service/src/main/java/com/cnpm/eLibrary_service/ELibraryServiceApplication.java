package com.cnpm.eLibrary_service;

import com.cnpm.eLibrary_service.configuration.VnPayConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableConfigurationProperties(VnPayConfig.class)
//@EnableScheduling
public class ELibraryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ELibraryServiceApplication.class, args);
	}

}
