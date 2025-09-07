package com.nursyah.bank_simulation.features.admin;

import com.nursyah.bank_simulation.features.admin.dto.RequestTopUpCustomer;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final IAdminService adminService;

    @Autowired
    public AdminController(IAdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/top-up")
    public CompletableFuture<ResponseEntity<ResponseDto>> topUpCustomerBalance(
            @RequestBody @Validated RequestTopUpCustomer request) {
        return adminService.topUpCustomerBalanceAsync(request)
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/customer")
    public CompletableFuture<ResponseEntity<ResponsePaginated<ResponseUser>>> viewCustomers(
            @ModelAttribute RequestPaginated request) {
        return adminService.viewCustomersAsync(request)
                .thenApply(ResponseEntity::ok);
    }

    @GetMapping("/transaction")
    public CompletableFuture<ResponseEntity<ResponsePaginated<ResponseTransaction>>> viewTransactionCustomers(
            @ModelAttribute RequestPaginated request) {
        return adminService.viewTransactionCustomersAsync(request)
                .thenApply(ResponseEntity::ok);
    }
}