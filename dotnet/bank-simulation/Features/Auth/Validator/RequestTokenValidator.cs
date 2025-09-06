using FluentValidation;
using bank_simulation.Features.Auth.Dto;

namespace bank_simulation.Features.Auth.Validator;

public class RequestTokenValidator : AbstractValidator<RequestToken>
{
    public RequestTokenValidator()
    {
        RuleFor(x => x.TokenResetPassword)
            .NotEmpty().WithMessage("Token is required.")
            .Matches("^[0-9a-fA-F]+$").WithMessage("Token must be a valid hexadecimal string.");
    }
}