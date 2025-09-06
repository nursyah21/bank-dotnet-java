namespace bank_simulation.Features.Admin.Dto;

public record RequestTopUpCustomer(
    Guid CustomerId,
    decimal? Amount
);