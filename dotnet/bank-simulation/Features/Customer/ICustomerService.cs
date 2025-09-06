using bank_simulation.Features.Customer.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Customer;

public interface ICustomerService
{
    Task<ResponseDto> SendMoneyAsync(RequestSendMoney request);
    Task<ResponseDto> WithdrawalMoneyAsync(RequestWidthdrawal request);
    Task<ResponsePaginated<ResponseTransaction>> ViewMyTransactionsAsync(RequestPaginated request);
}