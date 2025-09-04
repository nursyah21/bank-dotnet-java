using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Admin;

[ApiController]
[Route("api/v1/[controller]")]
public class AdminController : ControllerBase
{
    [HttpPost("top-up")]
    public string TopUpCustomerBalance()
    {
        return "Top up customer balance";
    }

    [HttpGet("customer")]
    public string ViewCustomers()
    {
        return "View customers";
    }

    [HttpGet("transaction")]
    public string ViewAllTransactions()
    {
        return "View all transaction";
    }
}
