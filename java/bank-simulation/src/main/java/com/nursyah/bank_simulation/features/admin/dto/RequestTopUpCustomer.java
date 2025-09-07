package com.nursyah.bank_simulation.features.admin.dto;

import java.util.UUID;
import java.math.BigDecimal;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record RequestTopUpCustomer(
        @NotNull(message = "Customer ID is required.") UUID customerId,

        @NotNull(message = "Amount is required.") @DecimalMin(value = "10.0", message = "Amount must be at least 10.") BigDecimal amount) {
}