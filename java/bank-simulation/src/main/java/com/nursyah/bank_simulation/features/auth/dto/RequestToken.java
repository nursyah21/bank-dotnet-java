package com.nursyah.bank_simulation.features.auth.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record RequestToken(
        @NotEmpty(message = "Token is required.") @Pattern(regexp = "^[0-9a-fA-F]+$", message = "Token must be a valid hexadecimal string.") String tokenResetPassword) {
}