package com.example.bank_simulation.features.auth;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping("/login")
    public String login() {
        return "Login";
    }

    @PostMapping("/register")
    public String register() {
        return "Register";
    }

    @GetMapping("/logout")
    public String logout() {
        return "Logout";
    }

    @GetMapping("/me")
    public String getAuthenticatedUser() {
        return "Get authenticated user";
    }

    @PostMapping("/reset-password")
    public String requestPasswordReset() {
        return "Request password reset";
    }

    @GetMapping("/reset-password")
    public String validatePasswordResetToken() {
        return "Validate password reset token";
    }

    @PutMapping("/reset-password")
    public String changePassword() {
        return "Change password";
    }
}