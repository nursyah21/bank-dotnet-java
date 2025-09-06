using FluentValidation;
using bank_simulation.Features.Customer.Dto;

namespace bank_simulation.Features.Customer.Validator;

public class RequestWidthdrawalValidator : AbstractValidator<RequestWidthdrawal>
{
    public RequestWidthdrawalValidator()
    {
        RuleFor(x => x.Amount)
            .NotNull().WithMessage("Amount is required.")
            .GreaterThanOrEqualTo(10).WithMessage("Amount must be at least 10.");
    }
}