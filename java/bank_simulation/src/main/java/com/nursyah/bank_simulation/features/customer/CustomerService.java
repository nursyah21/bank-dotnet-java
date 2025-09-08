package com.nursyah.bank_simulation.features.customer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Service;

import com.nursyah.bank_simulation.features.customer.dto.RequestSendMoney;
import com.nursyah.bank_simulation.features.customer.dto.RequestWidthdrawal;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;

@Service
public class CustomerService implements ICustomerService {

    public CompletableFuture<ResponseDto> sendMoneyAsync(RequestSendMoney request) {
        if (request.receiverId().equals(UUID.fromString("00000000-0000-0000-0000-000000000000"))) {
            throw new RuntimeException("Invalid receiver ID or insufficient balance.");
        }
        return CompletableFuture.completedFuture(new ResponseDto("Transaction successful. Money sent.", true));
    }

    public CompletableFuture<ResponsePaginated<ResponseTransaction>> viewMyTransactionsAsync(RequestPaginated request) {
        if (request.page().isPresent() && request.page().get() == -1) {
            throw new RuntimeException("Invalid page or sort parameter.");
        }
        var transactions = List.of(
                new ResponseTransaction(UUID.randomUUID(), "send", new BigDecimal("25.0"),
                        Optional.of(UUID.randomUUID()), UUID.randomUUID(), LocalDateTime.now()),
                new ResponseTransaction(UUID.randomUUID(), "withdrawal", new BigDecimal("15.0"), Optional.empty(),
                        UUID.randomUUID(), LocalDateTime.now()));
        var paginatedResponse = new ResponsePaginated<ResponseTransaction>(transactions, 2, 1);
        return CompletableFuture.completedFuture(paginatedResponse);
    }

    public CompletableFuture<ResponseDto> withdrawalMoneyAsync(RequestWidthdrawal request) {
        return CompletableFuture.completedFuture(new ResponseDto("Withdrawal successful.", true));
    }

}
