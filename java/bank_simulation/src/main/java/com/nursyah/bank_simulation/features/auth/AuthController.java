package com.nursyah.bank_simulation.features.auth;

import com.nursyah.bank_simulation.features.auth.dto.RequestChangePassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestLogin;
import com.nursyah.bank_simulation.features.auth.dto.RequestRegister;
import com.nursyah.bank_simulation.features.auth.dto.RequestResetPassword;
import com.nursyah.bank_simulation.features.auth.dto.RequestToken;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final IAuthService _authService;

    @Autowired
    public AuthController(IAuthService authService) {
        this._authService = authService;
    }

    @PostMapping("/login")
    public CompletableFuture<ResponseEntity<ResponseDto>> login(@RequestBody @Valid RequestLogin request) {
        return _authService.loginAsync(request)
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/register")
    public CompletableFuture<ResponseEntity<ResponseDto>> register(@RequestBody @Valid RequestRegister request) {
        return _authService.registerAsync(request)
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/logout")
    public CompletableFuture<ResponseEntity<ResponseDto>> logout() {
        return _authService.logoutAsync()
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/me")
    public CompletableFuture<ResponseEntity<ResponseUser>> getAuthenticatedUser() {
        return _authService.getAuthenticatedUserAsync()
                .thenApply(ResponseEntity::ok);
    }

    @PostMapping("/reset-password")
    public CompletableFuture<ResponseEntity<ResponseDto>> requestPasswordReset(@RequestBody @Valid RequestResetPassword request) {
        return _authService.requestPasswordResetAsync(request)
                .thenApply(result -> ResponseEntity.status(201).body(result));
    }

    @GetMapping("/reset-password")
    public CompletableFuture<ResponseEntity<ResponseDto>> validatePasswordResetToken(@RequestParam String token_reset_password) {
        RequestToken request = new RequestToken(token_reset_password);
        return _authService.validatePasswordResetTokenAsync(request)
                .thenApply(ResponseEntity::ok);
    }

    @PutMapping("/reset-password")
    public CompletableFuture<ResponseEntity<ResponseDto>> changePassword(
            @RequestParam("token_reset_password") @Valid RequestToken requestToken,
            @RequestBody @Valid RequestChangePassword request) {
        return _authService.changePasswordAsync(requestToken, request)
                .thenApply(ResponseEntity::ok);
    }
}