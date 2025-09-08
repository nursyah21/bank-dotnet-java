namespace bank_simulation.Shared.Dto;

public record ResponsePaginated<T>(
    List<T> Data,
    int TotalItems,
    int Page
);