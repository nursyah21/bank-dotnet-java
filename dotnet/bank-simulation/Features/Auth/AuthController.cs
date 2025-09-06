using bank_simulation.Features.Auth.Dto;
using bank_simulation.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Auth;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] RequestLogin request)
    {
        var result = await _authService.LoginAsync(request);
        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RequestRegister request)
    {
        var result = await _authService.RegisterAsync(request);
        return Ok(result);
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
        var result = await _authService.LogoutAsync();
        return Ok(result);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetAuthenticatedUser()
    {
        var result = await _authService.GetAuthenticatedUserAsync();
        return Ok(result);
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> RequestPasswordReset([FromBody] RequestResetPassword request)
    {
        var result = await _authService.RequestPasswordResetAsync(request);
        return StatusCode(201, result);
    }

    [HttpGet("reset-password")]
    public async Task<IActionResult> ValidatePasswordResetToken([FromQuery] RequestToken request)
    {
        var result = await _authService.ValidatePasswordResetTokenAsync(request);
        return Ok(result);
    }

    [HttpPut("reset-password")]
    public async Task<IActionResult> ChangePassword([FromQuery] RequestToken requestToken, [FromBody] RequestChangePassword request)
    {
        var result = await _authService.ChangePassworAsync(requestToken, request);
        return Ok(result);
    }
}