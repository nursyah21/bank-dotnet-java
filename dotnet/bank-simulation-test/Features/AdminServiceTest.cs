using bank_simulation.Features.Admin;
using bank_simulation.Features.Admin.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation_test.Features;

public class AdminServiceTest
{
    [Fact]
    public async Task AdminService_TopUpCustomerBalance_Success()
    {
        var service = new AdminService();
        var request = new RequestTopUpCustomer(Guid.NewGuid(), 100);
        var response = await service.TopUpCustomerBalanceAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Top up successful.", response.Message);
    }

    [Fact]
    public async Task AdminService_ViewCustomers_Success()
    {
        var service = new AdminService();
        var request = new RequestPaginated(null, null, null, null);
        var response = await service.ViewCustomersAsync(request);
        Assert.NotNull(response);
        Assert.Equal(1, response.Page);
        Assert.Equal(2, response.TotalItems);
        Assert.NotEmpty(response.Data);
    }

    [Fact]
    public async Task AdminService_ViewCustomers_Failure_InvalidPage()
    {
        var service = new AdminService();
        var request = new RequestPaginated(null, -1, null, null);
        await Assert.ThrowsAsync<Exception>(() => service.ViewCustomersAsync(request));
    }

    [Fact]
    public async Task AdminService_ViewTransactionCustomers_Success()
    {
        var service = new AdminService();
        var request = new RequestPaginated(null, null, null, null);
        var response = await service.ViewTransactionCustomersAsync(request);
        Assert.NotNull(response);
        Assert.Equal(1, response.Page);
        Assert.Equal(2, response.TotalItems);
        Assert.NotEmpty(response.Data);
    }

    [Fact]
    public async Task AdminService_ViewTransactionCustomers_Failure_InvalidPage()
    {
        var service = new AdminService();
        var request = new RequestPaginated(null, -1, null, null);
        await Assert.ThrowsAsync<Exception>(() => service.ViewTransactionCustomersAsync(request));
    }
}