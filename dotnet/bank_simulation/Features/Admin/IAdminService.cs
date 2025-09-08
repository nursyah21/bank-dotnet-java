using bank_simulation.Features.Admin.Dto;
using bank_simulation.Shared.Dto;

namespace bank_simulation.Features.Admin;

public interface IAdminService
{
    Task<ResponseDto> TopUpCustomerBalanceAsync(RequestTopUpCustomer request);
    Task<ResponsePaginated<ResponseUser>> ViewCustomersAsync(RequestPaginated request);
    Task<ResponsePaginated<ResponseTransaction>> ViewTransactionCustomersAsync(RequestPaginated request);
}