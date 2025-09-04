package com.example.bank_simulation.features.admin;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @PostMapping("/top-up")
    public Map<String, String> topUpCustomerBalance() {
        return Map.of("message", "Top up customer balance");
    }

    @GetMapping("/customer")
    public Map<String, String> viewCustomers() {
        return Map.of("message", "View customers");
    }

    @GetMapping("/transaction")
    public Map<String, String> viewAllTransactions() {
        return Map.of("message", "View all transaction");
    }
}