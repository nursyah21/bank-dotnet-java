package com.nursyah.bank_simulation.features.auth.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

public record RequestChangePassword(
        @NotEmpty(message = "Password is required.") @Size(min = 8, message = "Password must be at least 8 characters long.") @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$", message = "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.") String password) {
}