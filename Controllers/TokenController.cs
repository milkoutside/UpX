using System.Security.Claims;
using JwtAuthentication.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stairs.Models.Tokens;
using Upx.Data;
using Upx.Service.TokenService;

namespace Upx.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public TokenController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid client request");

            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var phone = principal.FindFirstValue(ClaimTypes.MobilePhone); //this is mapped to the Name claim by default

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid client request");

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();

            return Ok(new AuthenticatedResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

        [HttpPost, Authorize]
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var phone = User.FindFirstValue(ClaimTypes.MobilePhone);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone);
            if (user == null) return BadRequest();

            user.RefreshToken = null;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
