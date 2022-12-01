using System.ComponentModel.DataAnnotations;

namespace Stairs;

public class Users
{
    [Key] public int? Id { get; set; }
    public string Name { get; set; }

    public string Phone { get; set; }

    public string? Email { get; set; }

    public decimal? Balance { get; set; }

    public string? Password { get; set; }

    public string? RefreshToken { get; set; }

    public DateTime RefreshTokenExpiryTime { get; set; }
}