using bank_simulation.Features.Customer.Dto;
using bank_simulation.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Customer;

[ApiController]
[Route("api/v1/[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;
    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMoney([FromBody] RequestSendMoney request)
    {
        var result = await _customerService.SendMoneyAsync(request);
        return Ok(result);
    }

    [HttpPost("withdrawal")]
    public async Task<IActionResult> WithdrawalMoney([FromBody] RequestWidthdrawal request)
    {
        var result = await _customerService.WithdrawalMoneyAsync(request);
        return Ok(result);
    }

    [HttpGet("transaction")]
    public async Task<IActionResult> ViewMyTransactions([FromQuery] RequestPaginated request)
    {
        var result = await _customerService.ViewMyTransactionsAsync(request);
        return Ok(result);
    }
}
