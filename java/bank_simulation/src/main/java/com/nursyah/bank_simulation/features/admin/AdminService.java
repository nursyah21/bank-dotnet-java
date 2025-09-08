package com.nursyah.bank_simulation.features.admin;

import com.nursyah.bank_simulation.features.admin.dto.RequestTopUpCustomer;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
public class AdminService implements IAdminService {

    @Override
    public CompletableFuture<ResponseDto> topUpCustomerBalanceAsync(RequestTopUpCustomer request) {
        return CompletableFuture.completedFuture(new ResponseDto("Top up successful.", true));
    }

    @Override
    public CompletableFuture<ResponsePaginated<ResponseUser>> viewCustomersAsync(RequestPaginated request) {
        if (request.page().isPresent() && request.page().get() == -1) {
            throw new IllegalArgumentException("Invalid page or sort parameter.");
        }

        var customers = List.of(
                new ResponseUser(null, UUID.randomUUID(), "user_test", "user_test@example.com", null, "2000-12-30",
                        new BigDecimal("100.00")),
                new ResponseUser(null, UUID.randomUUID(), "user_test_2", "user_test2@example.com", null, "1999-01-01",
                        new BigDecimal("50.50")));

        var paginatedResponse = new ResponsePaginated<>(customers, 2, 1);
        return CompletableFuture.completedFuture(paginatedResponse);
    }

    @Override
    public CompletableFuture<ResponsePaginated<ResponseTransaction>> viewTransactionCustomersAsync(
            RequestPaginated request) {
        if (request.page().isPresent() && request.page().get() == -1) {
            throw new IllegalArgumentException("Invalid page or sort parameter.");
        }
        
        var transactions = new ArrayList<ResponseTransaction>();
        transactions.add(new ResponseTransaction(UUID.randomUUID(), "send", new BigDecimal("25.0"),
            Optional.of(UUID.randomUUID()), UUID.randomUUID(), LocalDateTime.now()));
        transactions.add(new ResponseTransaction(UUID.randomUUID(), "withdrawal", new BigDecimal("15.0"),
            Optional.empty(), UUID.randomUUID(), LocalDateTime.now()));

        var paginatedResponse = new ResponsePaginated<>(transactions, 2, 1);
        return CompletableFuture.completedFuture(paginatedResponse);
    }
}
