using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Admin;

[ApiController]
[Route("api/v1/[controller]")]
public class AdminController : ControllerBase
{
    [HttpPost("top-up")]
    public object TopUpCustomerBalance()
    {
        return new { message = "Top up customer balance" };
    }

    [HttpGet("customer")]
    public object ViewCustomers()
    {
        return new { message = "View customers" };
    }

    [HttpGet("transaction")]
    public object ViewAllTransactions()
    {
        return new { message = "View all transaction" };
    }
}
