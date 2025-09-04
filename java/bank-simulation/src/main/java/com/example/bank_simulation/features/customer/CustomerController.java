package com.example.bank_simulation.features.customer;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
    @PostMapping("/send")
    public Map<String, String> sendMoney() {
        return Map.of("message", "Send money");
    }

    @PostMapping("/withdrawal")
    public Map<String, String> withdrawalMoney() {
        return Map.of("message", "Withdrawal money");
    }

    @GetMapping("/transaction")
    public Map<String, String> viewMyTransactions() {
        return Map.of("message", "View my transaction");
    }
}