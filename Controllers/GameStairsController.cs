using Microsoft.AspNetCore.Mvc;
using Upx.Service.Stairs;

namespace Upx.Controllers;
[ApiController]
[Route("api/Stairs")]
public class GameStairsController : ControllerBase
{
     private StairsServices _stairsServices = new StairsServices();
    
    [HttpGet]
    public bool[][] GetStairs()
    {
        var array = _stairsServices.GetStairs(); 
        
        return array;
    }
}