namespace bank_simulation.Shared.Dto;

public record ResponseUser(
    Guid? Id,
    Guid NoId,
    string Username,
    string Email,
    string? Role,
    string BirthDate,
    decimal Balance
);