package com.nursyah.bank_simulation.shared.dto;
import java.util.List;

public record ResponsePaginated<T>(
    List<T> data,
    int totalItems,
    int page
) {}