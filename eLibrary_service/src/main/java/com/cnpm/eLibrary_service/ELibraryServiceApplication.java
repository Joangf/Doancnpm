package com.cnpm.eLibrary_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
//@EnableScheduling
public class ELibraryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ELibraryServiceApplication.class, args);
	}

}
