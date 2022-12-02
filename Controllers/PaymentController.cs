using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Upx.Data;
using Upx.Models.Payment;
using Upx.Service.Payments;

namespace Upx.Controllers;
[ApiController]
[Route("api/Payment")]
public class PaymentController : ControllerBase
{
    private readonly DataContext _context;
    

    private readonly PaymentsService _paymentsService;

    public PaymentController(PaymentsService paymentsService, DataContext context)
    {
        _paymentsService = paymentsService;
        
        _context = context;
    }
    
    
    [HttpPost]
    public async Task<ActionResult> Payments(PaymentsDbo payments)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == payments.UserId);
        if (payments != null && user !=null)
        {
            if (payments.Operation == "toUp")
            {
               user = _paymentsService.DoToUp(payments,user);
               
               _context.Operations.Add(payments);

               await _context.SaveChangesAsync();

            }
            else
            {
                user =  _paymentsService.WithdrawMoney(payments,user);
                
                _context.Operations.Add(payments);

                await _context.SaveChangesAsync();
            }

            return Ok();
        } 
        if(user == null || payments == null)
        {
            return BadRequest();
        }

        return Ok();
    }

    [HttpGet]
    public ActionResult<List<PaymentsDbo>> GetList()
    {
        var id = int.Parse(User.FindFirstValue(ClaimTypes.Sid));

        List<PaymentsDbo> list =  _context.Operations.Where(t => t.UserId == id).ToList();

        return Ok(list);
    }
}