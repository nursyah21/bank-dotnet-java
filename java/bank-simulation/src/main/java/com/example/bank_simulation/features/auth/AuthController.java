package com.example.bank_simulation.features.auth;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String>  login() {
        return Map.of("message", "Login");
    }

    @PostMapping("/register")
    public Map<String, String> register() {
        return Map.of("message", "Register");
    }

    @GetMapping("/logout")
    public Map<String, String> logout() {
        return Map.of("message", "Logout");
    }

    @GetMapping("/me")
    public Map<String, String> getAuthenticatedUser() {
        return Map.of("message", "Get authenticated user");
    }

    @PostMapping("/reset-password")
    public Map<String, String> requestPasswordReset() {
        return Map.of("message", "Request password reset");
    }

    @GetMapping("/reset-password")
    public Map<String, String> validatePasswordResetToken() {
        return Map.of("message", "Validate password reset token");
    }

    @PutMapping("/reset-password")
    public Map<String, String> changePassword() {
        return Map.of("message", "Change password");
    }
}