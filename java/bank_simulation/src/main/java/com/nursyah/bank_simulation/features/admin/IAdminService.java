package com.nursyah.bank_simulation.features.admin;

import com.nursyah.bank_simulation.features.admin.dto.RequestTopUpCustomer;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;
import java.util.concurrent.CompletableFuture;

public interface IAdminService {
    CompletableFuture<ResponseDto> topUpCustomerBalanceAsync(RequestTopUpCustomer request);
    CompletableFuture<ResponsePaginated<ResponseUser>> viewCustomersAsync(RequestPaginated request);
    CompletableFuture<ResponsePaginated<ResponseTransaction>> viewTransactionCustomersAsync(RequestPaginated request);
}