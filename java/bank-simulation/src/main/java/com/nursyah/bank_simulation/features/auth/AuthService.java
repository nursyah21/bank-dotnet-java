package com.nursyah.bank_simulation.features.auth;

import com.nursyah.bank_simulation.features.auth.dto.RequestChangePassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestLogin;
import com.nursyah.bank_simulation.features.auth.dto.RequestRegister;
import com.nursyah.bank_simulation.features.auth.dto.RequestResetPassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestToken;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class AuthService implements IAuthService {

    @Override
    public CompletableFuture<ResponseDto> loginAsync(RequestLogin request) {
        if ("invalid".equals(request.username()) || "invalid".equals(request.password())) {
            throw new IllegalArgumentException("Invalid credentials.");
        }
        return CompletableFuture.completedFuture(new ResponseDto("Login successful.", true));
    }

    @Override
    public CompletableFuture<ResponseDto> registerAsync(RequestRegister request) {
        return CompletableFuture.completedFuture(new ResponseDto("Registration successful.", true));
    }

    @Override
    public CompletableFuture<ResponseDto> logoutAsync() {
        return CompletableFuture.completedFuture(new ResponseDto("Logout successful.", true));
    }

    @Override
    public CompletableFuture<ResponseUser> getAuthenticatedUserAsync() {
         return CompletableFuture.completedFuture(new ResponseUser(
            Optional.of(UUID.randomUUID()),
            UUID.randomUUID(),
            "username",
            "email",
            Optional.of("customer"),
            "2000-12-30",
            new BigDecimal("10.0")
    ));
    }

    @Override
    public CompletableFuture<ResponseDto> requestPasswordResetAsync(RequestResetPassword request) {
        if ("invalid".equals(request.email())) {
            throw new IllegalArgumentException("Email is not in a valid format or does not exist.");
        }
        return CompletableFuture.completedFuture(new ResponseDto("Password reset link has been sent to your email.", true));
    }

    @Override
    public CompletableFuture<ResponseDto> validatePasswordResetTokenAsync(RequestToken request) {
        return CompletableFuture.completedFuture(new ResponseDto("Token is valid.", true));
    }

    @Override
    public CompletableFuture<ResponseDto> changePasswordAsync(RequestToken requestToken, RequestChangePassword request) {
        return CompletableFuture.completedFuture(new ResponseDto("Password has been successfully changed.", true));
    }
}