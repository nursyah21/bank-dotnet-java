using bank_simulation.Features.Customer.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Customer;

public class CustomerService : ICustomerService
{
    public Task<ResponseDto> SendMoneyAsync(RequestSendMoney request)
    {
        if (request.ReceiverId == Guid.Empty)
        {
            throw new Exception("Invalid receiver ID or insufficient balance.");
        }
        return Task.FromResult(new ResponseDto("Transaction successful. Money sent.", true));
    }

    public Task<ResponsePaginated<ResponseTransaction>> ViewMyTransactionsAsync(RequestPaginated request)
    {
        if (request.Page == -1)
        {
            throw new Exception("Invalid page or sort parameter.");
        }
        var transactions = new List<ResponseTransaction>
            {
                new(Guid.NewGuid(), "send", 25.0M, null, Guid.NewGuid(), DateTime.UtcNow),
                new(Guid.NewGuid(), "withdrawal", 15.0M, null, Guid.NewGuid(), DateTime.UtcNow)
            };
        var paginatedResponse = new ResponsePaginated<ResponseTransaction>(transactions, 2, 1);
        return Task.FromResult(paginatedResponse);
    }

    public Task<ResponseDto> WithdrawalMoneyAsync(RequestWidthdrawal request)
    {
        return Task.FromResult(new ResponseDto("Withdrawal successful.", true));
    }
}