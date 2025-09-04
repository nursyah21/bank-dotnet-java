using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Customer;

[ApiController]
[Route("api/v1/[controller]")]
public class CustomerController : ControllerBase
{
    [HttpPost("send")]
    public string SendMoney()
    {
        return "Send money";
    }

    [HttpPost("withdrawal")]
    public string WithdrawalMoney()
    {
        return "Withdrawal money";
    }

    [HttpGet("transaction")]
    public string ViewMyTransactions()
    {
        return "View my transaction";
    }
}
