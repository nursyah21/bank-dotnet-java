package com.nursyah.bank_simulation.features.auth.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;

public record RequestRegister(
        @NotEmpty(message = "Username is required.") @Size(min = 4, max = 20, message = "Username must be at least 4 characters long and cannot exceed 20 characters.") @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores.") String username,

        @NotEmpty(message = "Email is required.") @Email(message = "Email format is invalid.") String email,

        @NotEmpty(message = "Password is required.") @Size(min = 8, message = "Password must be at least 8 characters long.") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$", message = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.") String password,

        @NotEmpty(message = "BirthDate is required.") @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "BirthDate format must be yyyy-MM-dd.") String birthdate) {
}