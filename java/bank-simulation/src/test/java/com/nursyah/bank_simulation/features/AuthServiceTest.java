package com.nursyah.bank_simulation.features;

import com.nursyah.bank_simulation.features.auth.AuthService;
import com.nursyah.bank_simulation.features.auth.dto.*;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.concurrent.ExecutionException;

public class AuthServiceTest {

    private AuthService authService;

    @BeforeEach
    public void setUp() {
        authService = new AuthService();
    }

    @Test
    void loginSuccess() {
        var request = new RequestLogin("valid_username", "valid_password");
        ResponseDto response = authService.loginAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Login successful.", response.message());
    }

    @Test
    void loginFailureInvalidCredentials() {
        var request = new RequestLogin("invalid", "invalid");
        Assertions.assertThrows(RuntimeException.class,
                () -> authService.loginAsync(request).get());
    }

    @Test
    void registerSuccess() {
        var request = new RequestRegister("user_test", "user@example.com", "Password123!", "2000-12-30");
        ResponseDto response = authService.registerAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Registration successful.", response.message());
    }

    @Test
    void logoutSuccess() {
        ResponseDto response = authService.logoutAsync().join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Logout successful.", response.message());
    }

    @Test
    void getAuthenticatedUserSuccess() {
        ResponseUser response = authService.getAuthenticatedUserAsync().join();
        Assertions.assertNotNull(response);
    }

    @Test
    void requestPasswordResetSuccess() {
        var request = new RequestResetPassword("test@example.com");
        ResponseDto response = authService.requestPasswordResetAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Password reset link has been sent to your email.", response.message());
    }

    @Test
    void requestPasswordResetFailureInvalidEmail() {
        var request = new RequestResetPassword("invalid");
        // RuntimeException exception =
        Assertions.assertThrows(RuntimeException.class,
                () -> authService.requestPasswordResetAsync(request).get());
        // Assertions.assertTrue(exception.getCause() instanceof RuntimeException);
        // Assertions.assertEquals("Email is not in a valid format or does not exist.",
        // exception.getCause().getMessage());
    }

    @Test
    void validatePasswordResetTokenSuccess() {
        var request = new RequestToken("a1b2c3d4e5f6");
        ResponseDto response = authService.validatePasswordResetTokenAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Token is valid.", response.message());
    }

    @Test
    void changePasswordSuccess() {
        var requestToken = new RequestToken("a1b2c3d4e5f6");
        var requestChangePassword = new RequestChangePassword("NewPassword123!");
        ResponseDto response = authService.changePasswordAsync(requestToken, requestChangePassword).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Password has been successfully changed.", response.message());
    }
}