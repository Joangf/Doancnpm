package com.cnpm.eLibrary_service;

import org.springframework.boot.SpringApplication;

public class TestELibraryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(ELibraryServiceApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
