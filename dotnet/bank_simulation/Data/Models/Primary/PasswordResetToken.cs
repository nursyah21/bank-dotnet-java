namespace bank_simulation.Data.Models.Primary;

public partial class PasswordResetToken
{
    public string Token { get; set; } = null!;

    public Guid UserId { get; set; }

    public DateTime ExpiresAt { get; set; }

    public virtual User User { get; set; } = null!;
}
