package com.nursyah.bank_simulation.features.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record RequestResetPassword(
        @NotEmpty(message = "Email is required.") @Email(message = "Invalid email format.") String email) {
}