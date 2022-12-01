using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Upx.Data;
using Upx.Models.Bet;

namespace Upx.Controllers;

[ApiController]
[Authorize]
[Route("api/bet")]
public class BetController : ControllerBase
{
    private readonly DataContext _context;
    public BetController(DataContext context)
    {
        _context = context;
        
    }
 
    [HttpPost("acceptBet")]
    public async Task<IActionResult> AcceptBet(Bets bets)
    {
        var phone = User.FindFirstValue(ClaimTypes.MobilePhone);  
        var id = int.Parse(User.FindFirstValue(ClaimTypes.Sid));
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone && u.Id == id );
        
        if (user == null)
        {
            return BadRequest("Invalid user");
        }
        
        if (user.Balance < bets.Bet)
        {
            return BadRequest("Недостаточно средств");
        }

        user.Balance -= bets.Bet;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("paymentWin")]
    public async Task<IActionResult> PaymentWin(Bets bets)
    {
        var phone = User.FindFirstValue(ClaimTypes.MobilePhone);
        var id = int.Parse(User.FindFirstValue(ClaimTypes.Sid));
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone && u.Id == id);
        if (user == null)
        {
            return BadRequest("Invalid user");
        }

        user.Balance += (bets.Bet * (decimal)bets.Coefficient);

        await _context.SaveChangesAsync();

        return Ok($"{user.Balance}");
    }
}