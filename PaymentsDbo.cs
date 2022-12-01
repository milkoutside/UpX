using System.ComponentModel.DataAnnotations;

namespace Upx;

public class PaymentsDbo
{

    [Key]
    public int Id { get; set; }
    
    public int UserId { get; set; }
    
    public decimal Sum { get; set; }
    
    public string Operation { get; set; }
    
    public string PaymentType { get; set; }
    
    public string PaymentNumber { get; set; }
    
    public DateTime Date { get; set; } = DateTime.Now;
    

}