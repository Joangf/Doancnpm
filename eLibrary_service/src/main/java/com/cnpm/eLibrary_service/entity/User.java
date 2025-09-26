package com.cnpm.eLibrary_service.entity;

import com.cnpm.eLibrary_service.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    @Enumerated(EnumType.STRING)
    Role role;

    boolean isVerified;
}
