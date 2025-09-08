package com.nursyah.bank_simulation.features.customer.dto;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record RequestSendMoney(
        @NotNull(message = "Receiver ID is required.") UUID receiverId,
        @NotNull(message = "Amount is required.") @DecimalMin(value = "10.0", message = "Amount must be at least 10.") BigDecimal amount) {
}