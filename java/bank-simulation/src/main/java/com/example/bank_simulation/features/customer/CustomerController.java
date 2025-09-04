package com.example.bank_simulation.features.admin;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
    @PostMapping("/send")
    public String sendMoney() {
        return "Send money";
    }

    @PostMapping("/withdrawal")
    public String withdrawalMoney() {
        return "Withdrawal money";
    }

    @GetMapping("/transaction")
    public String viewMyTransactions() {
        return "View my transaction";
    }
}