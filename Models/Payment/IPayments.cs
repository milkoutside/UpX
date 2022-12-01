using Stairs;

namespace Upx.Models.Payment;

public interface IPayments
{ 
    public Users Replenish(PaymentsDbo payments, Users user);

    public Users Withdraw(PaymentsDbo payments, Users user);
}