using Stairs;

namespace Upx.Models.Payment;

public class BankCard : IPayments
{
    public Users Replenish(PaymentsDbo payments, Users user)
    {
        user.Balance += payments.Sum;

        return user;

    }

    public Users Withdraw(PaymentsDbo payments, Users user)
    {
        if(user.Balance >= payments.Sum)
            user.Balance -= payments.Sum;
        return user;
    }
    
}