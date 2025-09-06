using bank_simulation.Features.Admin.Dto;
using bank_simulation.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace bank_simulation.Features.Admin;

[ApiController]
[Route("api/v1/[controller]")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;
    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("top-up")]
    public async Task<IActionResult> TopUpCustomerBalance([FromBody] RequestTopUpCustomer request)
    {
        var result = await _adminService.TopUpCustomerBalanceAsync(request);
        return Ok(result);
    }

    [HttpGet("customer")]
    public async Task<IActionResult> ViewCustomers([FromQuery] RequestPaginated request)
    {
        var result = await _adminService.ViewCustomersAsync(request);
        return Ok(result);
    }

    [HttpGet("transaction")]
    public async Task<IActionResult> ViewTransactionCustomers([FromQuery] RequestPaginated request)
    {
        var result = await _adminService.ViewTransactionCustomersAsync(request);
        return Ok(result);
    }
}