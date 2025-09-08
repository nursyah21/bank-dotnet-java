using FluentValidation;
using bank_simulation.Features.Auth.Dto;

namespace bank_simulation.Features.Auth.Validator;

public class RequestChangePasswordValidator : AbstractValidator<RequestChangePassword>
{
    public RequestChangePasswordValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$").WithMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
    }
}