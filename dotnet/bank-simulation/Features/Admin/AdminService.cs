using bank_simulation.Features.Admin.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Admin;

public class AdminService : IAdminService
{
    public Task<ResponseDto> TopUpCustomerBalanceAsync(RequestTopUpCustomer request)
    {
         // throw new Exception("Invalid customer ID or amount is less than the minimum.");

        return Task.FromResult(new ResponseDto("Top up successful.", true));
    }

    public Task<ResponsePaginated<ResponseTransaction>> ViewTransactionCustomersAsync(RequestPaginated request)
    {
        if (request.Page == -1)
        {
            throw new Exception("Invalid page or sort parameter.");
        }
        var transactions = new List<ResponseTransaction>
            {
                new(Guid.NewGuid(), "send", 25.0M, Guid.NewGuid(), Guid.NewGuid(), DateTime.UtcNow),
                new(Guid.NewGuid(), "withdrawal", 15.0M, Guid.NewGuid(), Guid.NewGuid(), DateTime.UtcNow)
            };
        var paginatedResponse = new ResponsePaginated<ResponseTransaction>(transactions, 2, 1);
        return Task.FromResult(paginatedResponse);
    }

    public Task<ResponsePaginated<ResponseUser>> ViewCustomersAsync(RequestPaginated request)
    {
        if (request.Page == -1)
        {
            throw new Exception("Invalid page or sort parameter.");
        }
        var customers = new List<ResponseUser>
            {
                new(null, Guid.NewGuid(), "user_test", "user_test@example.com", null, "2000-12-30", 100.00M),
                new(null, Guid.NewGuid(), "user_test_2", "user_test2@example.com", null, "1999-01-01", 50.50M)
            };
        var paginatedResponse = new ResponsePaginated<ResponseUser>(customers, 2, 1);
        return Task.FromResult(paginatedResponse);
    }
}