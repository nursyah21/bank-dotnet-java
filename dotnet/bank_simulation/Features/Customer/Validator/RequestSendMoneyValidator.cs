using FluentValidation;
using bank_simulation.Features.Customer.Dto;

namespace bank_simulation.Features.Customer.Validator;

public class RequestSendMoneyValidator : AbstractValidator<RequestSendMoney>
{
    public RequestSendMoneyValidator()
    {
        RuleFor(x => x.ReceiverId)
            .NotEmpty().WithMessage("Receiver ID is required.");

        RuleFor(x => x.Amount)
            .NotNull().WithMessage("Amount is required.")
            .GreaterThanOrEqualTo(10).WithMessage("Amount must be at least 10.");
    }
}