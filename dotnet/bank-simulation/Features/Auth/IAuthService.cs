using bank_simulation.Features.Auth.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Auth;

public interface IAuthService
{
    Task<ResponseDto> LoginAsync(RequestLogin request);
    Task<ResponseDto> RegisterAsync(RequestRegister request);
    Task<ResponseDto> LogoutAsync();
    Task<ResponseUser> GetAuthenticatedUserAsync();
    Task<ResponseDto> RequestPasswordResetAsync(RequestResetPassword request);
    Task<ResponseDto> ValidatePasswordResetTokenAsync(RequestToken request);
    Task<ResponseDto> ChangePassworAsync(RequestToken requestToken, RequestChangePassword request);
}