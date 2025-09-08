namespace bank_simulation.Features.Auth.Dto;

public record RequestRegister(
    string Username,
    string Email,
    string Password,
    string Birthdate
);