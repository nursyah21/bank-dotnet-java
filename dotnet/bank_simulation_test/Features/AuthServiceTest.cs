using bank_simulation.Features.Auth;
using bank_simulation.Features.Auth.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation_test.Features;

public class AuthServiceTest
{
    [Fact]
    public async Task AuthService_Login_Success()
    {
        var service = new AuthService();
        var request = new RequestLogin("valid_username", "valid_password");
        var response = await service.LoginAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Login successful.", response.Message);
    }

    [Fact]
    public async Task AuthService_Login_Failure_InvalidCredentials()
    {
        var service = new AuthService();
        var request = new RequestLogin("invalid", "invalid");
        await Assert.ThrowsAsync<Exception>(() => service.LoginAsync(request));
    }

    [Fact]
    public async Task AuthService_Register_Success()
    {
        var service = new AuthService();
        var request = new RequestRegister("user_test", "user@example.com", "Password123!", "2000-12-30");
        var response = await service.RegisterAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Registration successful.", response.Message);
    }

    [Fact]
    public async Task AuthService_Logout_Success()
    {
        var service = new AuthService();
        var response = await service.LogoutAsync();
        Assert.True(response.Success);
        Assert.Equal("Logout successful.", response.Message);
    }

    [Fact]
    public async Task AuthService_GetAuthenticatedUser_Success()
    {
        var service = new AuthService();
        var response = await service.GetAuthenticatedUserAsync();
        Assert.NotNull(response);
        Assert.IsType<ResponseUser>(response);
    }

    [Fact]
    public async Task AuthService_RequestPasswordReset_Success()
    {
        var service = new AuthService();
        var request = new RequestResetPassword("test@example.com");
        var response = await service.RequestPasswordResetAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Password reset link has been sent to your email.", response.Message);
    }

    [Fact]
    public async Task AuthService_RequestPasswordReset_Failure_InvalidEmail()
    {
        var service = new AuthService();
        var request = new RequestResetPassword("invalid");
        await Assert.ThrowsAsync<Exception>(() => service.RequestPasswordResetAsync(request));
    }

    [Fact]
    public async Task AuthService_ValidatePasswordResetToken_Success()
    {
        var service = new AuthService();
        var request = new RequestToken("a1b2c3d4e5f6");
        var response = await service.ValidatePasswordResetTokenAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Token is valid.", response.Message);
    }

    [Fact]
    public async Task AuthService_ChangePassword_Success()
    {
        var service = new AuthService();
        var requestToken = new RequestToken("a1b2c3d4e5f6");
        var requestChangePassword = new RequestChangePassword { Password = "NewPassword123!" };
        var response = await service.ChangePassworAsync(requestToken, requestChangePassword);
        Assert.True(response.Success);
        Assert.Equal("Password has been successfully changed.", response.Message);
    }
}