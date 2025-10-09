package com.cnpm.eLibrary_service.dto.response;

import com.cnpm.eLibrary_service.entity.enums.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    Role role;
    String token;
    boolean authenticated;
}
