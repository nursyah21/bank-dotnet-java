using bank_simulation.Features.Customer;
using bank_simulation.Features.Customer.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation_test.Features;

public class CustomerServiceTest
{
    [Fact]
    public async Task CustomerService_SendMoney_Success()
    {
        var service = new CustomerService();
        var request = new RequestSendMoney(Guid.NewGuid(), 100);
        var response = await service.SendMoneyAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Transaction successful. Money sent.", response.Message);
    }

    [Fact]
    public async Task CustomerService_SendMoney_Failure_InvalidReceiverId()
    {
        var service = new CustomerService();
        var request = new RequestSendMoney(Guid.Empty, 100);
        await Assert.ThrowsAsync<Exception>(() => service.SendMoneyAsync(request));
    }

    [Fact]
    public async Task CustomerService_WithdrawalMoney_Success()
    {
        var service = new CustomerService();
        var request = new RequestWidthdrawal(50);
        var response = await service.WithdrawalMoneyAsync(request);
        Assert.True(response.Success);
        Assert.Equal("Withdrawal successful.", response.Message);
    }

    [Fact]
    public async Task CustomerService_ViewMyTransactions_Success()
    {
        var service = new CustomerService();
        var request = new RequestPaginated(null, null, null, null);
        var response = await service.ViewMyTransactionsAsync(request);
        Assert.NotNull(response);
        Assert.Equal(1, response.Page);
        Assert.Equal(2, response.TotalItems);
        Assert.NotEmpty(response.Data);
    }

    [Fact]
    public async Task CustomerService_ViewMyTransactions_Failure_InvalidPage()
    {
        var service = new CustomerService();
        var request = new RequestPaginated(null, -1, null, null);
        await Assert.ThrowsAsync<Exception>(() => service.ViewMyTransactionsAsync(request));
    }
}