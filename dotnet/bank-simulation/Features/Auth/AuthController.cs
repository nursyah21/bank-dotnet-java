using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Auth;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public object Login()
    {
        return new { message = "Login" };
    }

    [HttpPost("register")]
    public object Register()
    {
        return new { message = "Register" };
    }

    [HttpGet("logout")]
    public object Logout()
    {
        return new { message = "Logout" };
    }

    [HttpGet("me")]
    public object GetAuthenticatedUser()
    {
        return new { message = "Get authenticated user" };
    }

    [HttpPost("reset-password")]
    public object RequestPasswordReset()
    {
        return new { message = "Request password reset" };
    }

    [HttpGet("reset-password")]
    public object ValidatePasswordResetToken()
    {
        return new { message = "Validate password reset token" };
    }

    [HttpPut("reset-password")]
    public object ChangePassword()
    {
        return new { message = "Change password" };
    }
}
