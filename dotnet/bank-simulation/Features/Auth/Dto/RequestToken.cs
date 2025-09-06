using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Auth.Dto;

public record RequestToken(
    [FromQuery(Name = "token_reset_password")]
    string TokenResetPassword
);