namespace bank_simulation.Shared.Dto;

public record ResponseTransaction(
    Guid Id,
    string Type,
    decimal Amount,
    Guid? SenderId,
    Guid ReceiverId,
    DateTime CreatedAt
);