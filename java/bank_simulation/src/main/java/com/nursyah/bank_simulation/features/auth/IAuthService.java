package com.nursyah.bank_simulation.features.auth;

import com.nursyah.bank_simulation.features.auth.dto.RequestChangePassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestLogin;
import com.nursyah.bank_simulation.features.auth.dto.RequestRegister;
import com.nursyah.bank_simulation.features.auth.dto.RequestResetPassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestToken;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import java.util.concurrent.CompletableFuture;

public interface IAuthService {
    CompletableFuture<ResponseDto> loginAsync(RequestLogin request);
    CompletableFuture<ResponseDto> registerAsync(RequestRegister request);
    CompletableFuture<ResponseDto> logoutAsync();
    CompletableFuture<ResponseUser> getAuthenticatedUserAsync();
    CompletableFuture<ResponseDto> requestPasswordResetAsync(RequestResetPassword request);
    CompletableFuture<ResponseDto> validatePasswordResetTokenAsync(RequestToken request);
    CompletableFuture<ResponseDto> changePasswordAsync(RequestToken requestToken, RequestChangePassword request);
}