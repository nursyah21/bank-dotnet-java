package com.nursyah.bank_simulation.features.customer;

import java.util.concurrent.CompletableFuture;

import com.nursyah.bank_simulation.features.customer.dto.RequestSendMoney;
import com.nursyah.bank_simulation.features.customer.dto.RequestWidthdrawal;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;

public interface ICustomerService {
    CompletableFuture<ResponseDto> sendMoneyAsync(RequestSendMoney request);
    CompletableFuture<ResponseDto> withdrawalMoneyAsync(RequestWidthdrawal request);
    CompletableFuture<ResponsePaginated<ResponseTransaction>> viewMyTransactionsAsync(RequestPaginated request);
}
