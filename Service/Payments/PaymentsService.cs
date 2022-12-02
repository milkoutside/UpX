
using Stairs;
using Upx.Models.Payment;


namespace Upx.Service.Payments;

public class PaymentsService 
{

    private readonly BankCard _bankCard = new BankCard();
    
    public Users DoToUp(PaymentsDbo payments, Users user)
    {

        if (payments != null && user != null)
        {
            switch (payments.PaymentType)
            {
                //here i need to do card validator and create new methods for bitcoin and paypal
                case "MasterCard":
                    if(payments.PaymentNumber[0] == '5')
                        user =  _bankCard.Replenish(payments, user);
                    break;
                case "Visa": 
                    if(payments.PaymentNumber[0] == '4')
                        user =  _bankCard.Replenish(payments, user);
                    break;
                case "PayPal":
                    user =  _bankCard.Replenish(payments, user);
                    break;
                case "Bitcoin":
                    user =  _bankCard.Replenish(payments, user);
                    break;
            }

            return user;

        }
        return user;
    }
    public Users WithdrawMoney(PaymentsDbo payments, Users user)
    {
        if (user != null && user != null)
        {
            switch (payments.PaymentType)
            {
                //here i need to do card validator and create new methods for bitcoin and paypal
                case "MasterCard":
                     user = _bankCard.Withdraw(payments, user);
                    break;
                case "Visa": 
                     user = _bankCard.Withdraw(payments, user);
                    break;
                case "PayPal":
                     user = _bankCard.Withdraw(payments, user);
                    break;
                case "Bitcoin":
                     user = _bankCard.Withdraw(payments, user);
                    break;
            }
        }
        return user;
    }
}