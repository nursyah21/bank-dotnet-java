using FluentValidation;
using bank_simulation.Features.Admin.Dto;

namespace bank_simulation.Features.Admin.Validator;

public class RequestTopUpCustomerValidator : AbstractValidator<RequestTopUpCustomer>
{
    public RequestTopUpCustomerValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty().WithMessage("Customer ID is required.");

        RuleFor(x => x.Amount)
            .NotNull().WithMessage("Amount is required.")
            .GreaterThanOrEqualTo(10).WithMessage("Amount must be at least 10.");
    }
}