using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Upx.Data;

namespace Upx.Controllers;
[ApiController]
[Route("api/Users")]
public class UserController : ControllerBase
{

    private readonly DataContext _context;

        

    public UserController( DataContext context)
    {
        _context = context;

    }
    [HttpGet,Authorize]
    public async Task<OkObjectResult> GetMe()
    {
        
        var phone = User.FindFirstValue(ClaimTypes.MobilePhone);  
        var id = int.Parse(User.FindFirstValue(ClaimTypes.Sid));
        var user = await _context.Users.FirstAsync(u => u.Id == id && u.Phone == phone);
        
        
            
        return Ok(user);
    }
}