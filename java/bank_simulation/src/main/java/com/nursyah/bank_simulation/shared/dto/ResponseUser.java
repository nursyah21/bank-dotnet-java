package com.nursyah.bank_simulation.shared.dto;
import java.util.Optional;
import java.util.UUID;
import java.math.BigDecimal;

public record ResponseUser(
    Optional<UUID> id,
    UUID noId,
    String username,
    String email,
    Optional<String> role,
    String birthDate,
    BigDecimal balance
) {}