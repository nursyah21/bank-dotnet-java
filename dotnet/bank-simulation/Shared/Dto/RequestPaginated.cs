namespace bank_simulation.Shared.Dto;

public record RequestPaginated(
    string? Search,
    int? Page,
    string? Sort,
    string? Type
);