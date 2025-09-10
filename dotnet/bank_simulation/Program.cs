
using System.Text.Json;
using System.Text.Json.Serialization;
using bank_simulation.Data.Contexts;
using bank_simulation.Features.Admin;
using bank_simulation.Features.Auth;
using bank_simulation.Features.Auth.Validator;
using bank_simulation.Features.Customer;
using bank_simulation.Shared.Dto;
using bank_simulation.Shared.Filter;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PrimaryContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PrimaryConnection"));
});

builder.Services.AddDbContext<AuditContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("AuditConnection"));
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
}).ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var allErrors = context.ModelState.Values
                            .SelectMany(v => v.Errors)
                            .Select(e => e.ErrorMessage)
                            .ToList();

        var messageToShow = allErrors.Any(e =>
            e.Contains("LineNumber:") ||
            e.Contains("0x")
        )
        ? "Invalid input."
        : allErrors.FirstOrDefault() ?? "Invalid request.";

        var loggerFactory = context.HttpContext.RequestServices.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger("ModelStateValidation");
        logger.LogWarning("Error: {Errors}", string.Join("; ", allErrors));

        var responseDto = new ResponseDto(messageToShow, false);

        return new BadRequestObjectResult(responseDto);
    };
}).AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

builder.Services.AddValidatorsFromAssemblyContaining<RequestRegisterValidator>();
builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();