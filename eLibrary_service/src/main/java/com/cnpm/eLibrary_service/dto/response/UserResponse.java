package com.cnpm.eLibrary_service.dto.response;

import com.cnpm.eLibrary_service.entity.enums.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String username;
    String password;
    String firstName;
    String lastName;
    String email;
    Role role;
}
