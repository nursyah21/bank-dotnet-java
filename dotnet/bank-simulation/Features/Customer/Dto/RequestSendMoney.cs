namespace bank_simulation.Features.Customer.Dto;

public record RequestSendMoney(
    Guid ReceiverId,
    decimal Amount
);