using bank_simulation.Features.Auth.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Auth;

public class AuthService : IAuthService
{
    public Task<ResponseDto> ChangePassworAsync(RequestToken requestToken, RequestChangePassword request)
    {
        // Add logic to validate the token_reset_password here if needed.
        return Task.FromResult(new ResponseDto("Password has been successfully changed.", true));
    }

    public Task<ResponseUser> GetAuthenticatedUserAsync()
    {
        return Task.FromResult(new ResponseUser(
            Guid.NewGuid(),
            Guid.NewGuid(),
            "username",
            "email",
            "customer",
            "2000-12-30",
            10M
        ));
    }

    public Task<ResponseDto> LoginAsync(RequestLogin request)
    {
        if (request.Username == "invalid" || request.Password == "invalid")
        {
            throw new Exception("Invalid credentials.");
        }
        return Task.FromResult(new ResponseDto("Login successful.", true));
    }

    public Task<ResponseDto> LogoutAsync()
    {
        return Task.FromResult(new ResponseDto("Logout successful.", true));
    }

    public Task<ResponseDto> RegisterAsync(RequestRegister request)
    {
        return Task.FromResult(new ResponseDto("Registration successful.", true));
    }

    public Task<ResponseDto> RequestPasswordResetAsync(RequestResetPassword request)
    {
        if (request.Email == "invalid")
        {
            throw new Exception("Email is not in a valid format or does not exist.");
        }
        return Task.FromResult(new ResponseDto("Password reset link has been sent to your email.", true));
    }

    public Task<ResponseDto> ValidatePasswordResetTokenAsync(RequestToken request)
    {
        // Add logic to validate the token_reset_password here.
        return Task.FromResult(new ResponseDto("Token is valid.", true));
    }
}