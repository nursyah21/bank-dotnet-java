package com.nursyah.bank_simulation.features;

import com.nursyah.bank_simulation.features.customer.CustomerService;
import com.nursyah.bank_simulation.features.customer.dto.RequestSendMoney;
import com.nursyah.bank_simulation.features.customer.dto.RequestWidthdrawal;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.UUID;
import java.util.Optional;

public class CustomerServiceTest {

    private CustomerService customerService;

    @BeforeEach
    public void setUp() {
        customerService = new CustomerService();
    }

    @Test
    void customerServiceSendMoneySuccess() {
        var request = new RequestSendMoney(UUID.randomUUID(), new BigDecimal("100"));
        ResponseDto response = customerService.sendMoneyAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Transaction successful. Money sent.", response.message());
    }

    @Test
    void customerServiceSendMoneyFailureInvalidReceiverId() {
        var request = new RequestSendMoney(UUID.fromString("00000000-0000-0000-0000-000000000000"), new BigDecimal("100"));
        Assertions.assertThrows(RuntimeException.class, () -> customerService.sendMoneyAsync(request).get());
    }

    @Test
    void customerServiceWithdrawalMoneySuccess() {
        var request = new RequestWidthdrawal(new BigDecimal("50"));
        ResponseDto response = customerService.withdrawalMoneyAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Withdrawal successful.", response.message());
    }

    @Test
    void customerServiceViewMyTransactionsSuccess() {
        var request = new RequestPaginated(Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());
        ResponsePaginated<ResponseTransaction> response = customerService.viewMyTransactionsAsync(request).join();
        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.page());
        Assertions.assertEquals(2, response.totalItems());
        Assertions.assertFalse(response.data().isEmpty());
    }

    @Test
    void customerServiceViewMyTransactionsFailureInvalidPage() {
        var request = new RequestPaginated(Optional.empty(), Optional.of(-1), Optional.empty(), Optional.empty());
        Assertions.assertThrows(RuntimeException.class, () -> customerService.viewMyTransactionsAsync(request).get());
    }
}