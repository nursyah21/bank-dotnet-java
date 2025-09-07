package com.nursyah.bank_simulation.shared.dto;
import java.util.Optional;
import java.util.UUID;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ResponseTransaction(
    UUID id,
    String type,
    BigDecimal amount,
    Optional<UUID> senderId,
    UUID receiverId,
    LocalDateTime createdAt
) {}