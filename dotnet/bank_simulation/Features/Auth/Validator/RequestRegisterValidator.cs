using FluentValidation;
using bank_simulation.Features.Auth.Dto;

namespace bank_simulation.Features.Auth.Validator;

public class RequestRegisterValidator : AbstractValidator<RequestRegister>
{
    public RequestRegisterValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.")
            .MinimumLength(4).WithMessage("Username must be at least 4 characters long.")
            .MaximumLength(20).WithMessage("Username cannot exceed 20 characters.")
            .Matches("^[a-zA-Z0-9_]+$").WithMessage("Username can only contain letters, numbers, and underscores.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Email format is invalid.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(8).WithMessage("Password must be at least 8 characters long.")
            .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).+$").WithMessage("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");

        RuleFor(x => x.Birthdate)
            .NotEmpty().WithMessage("BirthDate is required.")
            .Matches("^\\d{4}-\\d{2}-\\d{2}$").WithMessage("BirthDate format must be yyyy-MM-dd.")
            .Must(BeAValidDate).WithMessage("BirthDate is not a valid date.");
    }

    private bool BeAValidDate(string date)
    {
        return DateTime.TryParseExact(date, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _);
    }
}