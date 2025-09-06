using FluentValidation;
using bank_simulation.Features.Auth.Dto;

namespace bank_simulation.Features.Auth.Validator;

public class RequestResetPasswordValidator : AbstractValidator<RequestResetPassword>
{
    public RequestResetPasswordValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.");
    }
}