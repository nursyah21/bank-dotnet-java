package com.nursyah.bank_simulation.shared.dto;
import java.util.Optional;

public record RequestPaginated(
    Optional<String> search,
    Optional<Integer> page,
    Optional<String> sort,
    Optional<String> type
) {}