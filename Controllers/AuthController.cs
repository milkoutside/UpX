using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stairs;
using Stairs.Models.Tokens;
using Upx.Data;
using Upx.Service.TokenService;

namespace Upx.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {

     
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
      
        

        public AuthController(DataContext context,ITokenService tokenService)
        {
            _context = context;
           
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
            
        }
        [HttpPost("register")]
        public async Task<ActionResult<Users>> Register(Users request)
        {
            _context.Users.Add(request);
            await _context.SaveChangesAsync();
            return Ok();
        
        
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login(Users users)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                (u.Phone == users.Phone) && (u.Password == users.Password));
            if (user is null)
                return Unauthorized();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
                new Claim(ClaimTypes.MobilePhone, user.Phone),
                new Claim(ClaimTypes.Actor, user.Balance.ToString()),
                new Claim(ClaimTypes.Role, "Users")
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

            await _context.SaveChangesAsync();

            return Ok(new AuthenticatedResponse
            {
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }
    }


    
}
