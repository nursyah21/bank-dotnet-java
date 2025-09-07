package com.nursyah.bank_simulation.features.customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nursyah.bank_simulation.features.customer.dto.RequestSendMoney;
import com.nursyah.bank_simulation.features.customer.dto.RequestWidthdrawal;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1/customer")
public class CustomerController {
    private final ICustomerService customerService;

    @Autowired
    public CustomerController(ICustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/send")
    public CompletableFuture<ResponseEntity<ResponseDto>> sendMoney(@RequestBody RequestSendMoney request) {
        return customerService.sendMoneyAsync(request).thenApply(ResponseEntity::ok);
    }

    @PostMapping("/withdrawal")
    public CompletableFuture<ResponseEntity<ResponseDto>> withdrawalMoney(@RequestBody RequestWidthdrawal request) {
        return customerService.withdrawalMoneyAsync(request).thenApply(ResponseEntity::ok);
    }

    @GetMapping("/transaction")
    public CompletableFuture<ResponseEntity<ResponsePaginated<ResponseTransaction>>> viewMyTransactions(@RequestParam RequestPaginated request) {
        return customerService.viewMyTransactionsAsync(request).thenApply(ResponseEntity::ok);
    }
}