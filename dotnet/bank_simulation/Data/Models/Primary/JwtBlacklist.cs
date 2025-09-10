namespace bank_simulation.Data.Models.Primary;

public partial class JwtBlacklist
{
    public string Token { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }
}
