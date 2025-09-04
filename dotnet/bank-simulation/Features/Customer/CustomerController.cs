using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Customer;

[ApiController]
[Route("api/v1/[controller]")]
public class CustomerController : ControllerBase
{
    [HttpPost("send")]
    public object SendMoney()
    {
        return new { message = "Send money" };
    }

    [HttpPost("withdrawal")]
    public object WithdrawalMoney()
    {
        return new { message = "Withdrawal money" };
    }

    [HttpGet("transaction")]
    public object ViewMyTransactions()
    {
        return new { message = "View my transaction" };
    }
}
