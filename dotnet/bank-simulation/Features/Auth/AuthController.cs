using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Auth;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public string Login()
    {
        return "Login";
    }

    [HttpPost("register")]
    public string Register()
    {
        return "Register";
    }

    [HttpGet("logout")]
    public string Logout()
    {
        return "Logout";
    }

    [HttpGet("me")]
    public string GetAuthenticatedUser()
    {
        return "Get authenticated user";
    }

    [HttpPost("reset-password")]
    public string RequestPasswordReset()
    {
        return "Request password reset";
    }

    [HttpGet("reset-password")]
    public string ValidatePasswordResetToken()
    {
        return "Validate password reset token";
    }

    [HttpPut("reset-password")]
    public string ChangePassword()
    {
        return "Change password";
    }
}
