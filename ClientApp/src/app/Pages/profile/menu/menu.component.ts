import {Component, Input, OnInit} from '@angular/core';
import {Users} from "../../../Models/Users";
import {PaymentsService} from "../../../Service/payments.service";
import {Payments} from "../../../_interfaces/payments";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
@Input()  userInfo:Users = new Users();
isOpen = false;
  operation:string = 'settings';
paymentsInfo:Payments = {
  operation: this.operation, paymentNumber: "", paymentType: "", sum: 0, userId: 0
};
trasactions:Payments[];
  constructor(private paymentsService:PaymentsService) {}

  ngOnInit() {
    this.paymentsInfo.userId = this.userInfo.id!;
    this.paymentsService.getListTrasaction().subscribe((res)=>this.trasactions = res);
  }


  openPayment()
  {
    this.isOpen = true;
    console.log(this.paymentsInfo,"asd")
  }

  logout()
  {
    localStorage.removeItem("jwt")
    localStorage.removeItem("refreshToken");
    setTimeout(()=>{window.location.reload()},10)
  }
}
