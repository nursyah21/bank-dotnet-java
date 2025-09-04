var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapPost("/api/v1/auth/login", () => "Login");
app.MapPost("/api/v1/auth/register", () => "Register");
app.MapGet("/api/v1/auth/logout", () => "Logout");
app.MapGet("/api/v1/auth/me", () => "Get authenticated user");
app.MapPost("/api/v1/auth/reset-password", () => "Request password reset");
app.MapGet("/api/v1/auth/reset-password", () => "Validate password reset token");
app.MapPut("/api/v1/auth/reset-password", () => "Change password");

app.MapPost("/api/v1/admin/top-up", () => "Top up customer balance");
app.MapGet("/api/v1/admin/customer", () => "View customers");
app.MapGet("/api/v1/admin/transaction", () => "View all transaction");

app.MapPost("/api/v1/customer/send", () => "Send money");
app.MapPost("/api/v1/customer/withdrawal", () => "Withdrawal money");
app.MapGet("/api/v1/customer/transaction", () => "View my transaction");



app.Run();
