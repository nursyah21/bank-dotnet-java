package com.example.bank_simulation.features.admin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    @PostMapping("/top-up")
    public String topUpCustomerBalance() {
        return "Top up customer balance";
    }

    @GetMapping("/customer")
    public String viewCustomers() {
        return "View customers";
    }

    @GetMapping("/transaction")
    public String viewAllTransactions() {
        return "View all transaction";
    }
}