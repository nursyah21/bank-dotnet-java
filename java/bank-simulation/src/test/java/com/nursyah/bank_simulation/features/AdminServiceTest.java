package com.nursyah.bank_simulation.features;

import com.nursyah.bank_simulation.features.admin.AdminService;
import com.nursyah.bank_simulation.features.admin.dto.RequestTopUpCustomer;
import com.nursyah.bank_simulation.shared.dto.RequestPaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseDto;
import com.nursyah.bank_simulation.shared.dto.ResponsePaginated;
import com.nursyah.bank_simulation.shared.dto.ResponseTransaction;
import com.nursyah.bank_simulation.shared.dto.ResponseUser;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.concurrent.ExecutionException;
import java.math.BigDecimal;
import java.util.UUID;
import java.util.Optional;

public class AdminServiceTest {

    private AdminService adminService;

    @BeforeEach
    public void setUp() {
        this.adminService = new AdminService();
    }

    @Test
    void adminServiceTopUpCustomerBalanceSuccess() {
        var request = new RequestTopUpCustomer(UUID.randomUUID(), new BigDecimal("100"));
        ResponseDto response = adminService.topUpCustomerBalanceAsync(request).join();
        Assertions.assertTrue(response.success());
        Assertions.assertEquals("Top up successful.", response.message());
    }

    @Test
    void adminServiceViewCustomersSuccess() {
        var request = new RequestPaginated(Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());
        ResponsePaginated<ResponseUser> response = adminService.viewCustomersAsync(request).join();
        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.page());
        Assertions.assertEquals(2, response.totalItems());
        Assertions.assertFalse(response.data().isEmpty());
    }

    @Test
    void adminServiceViewCustomersFailureInvalidPage() {
        var request = new RequestPaginated(Optional.empty(), Optional.of(-1), Optional.empty(), Optional.empty());
        Assertions.assertThrows(RuntimeException.class, () -> adminService.viewCustomersAsync(request).get());
    }

    @Test
    void adminServiceViewTransactionCustomersSuccess() {
        var request = new RequestPaginated(Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty());
        ResponsePaginated<ResponseTransaction> response = adminService.viewTransactionCustomersAsync(request).join();
        Assertions.assertNotNull(response);
        Assertions.assertEquals(1, response.page());
        Assertions.assertEquals(2, response.totalItems());
        Assertions.assertFalse(response.data().isEmpty());
    }

    @Test
    void adminServiceViewTransactionCustomersFailureInvalidPage() {
        var request = new RequestPaginated(Optional.empty(), Optional.of(-1), Optional.empty(), Optional.empty());
        Assertions.assertThrows(RuntimeException.class, () -> adminService.viewTransactionCustomersAsync(request).get());
    }
}