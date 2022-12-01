import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentsService} from "../../../../Service/payments.service";
import {Payments} from "../../../../_interfaces/payments";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {
@Input() paymentsInfo:Payments;
@Output() isOpen$:EventEmitter<any> = new EventEmitter<any>();
  constructor(private paymentsService:PaymentsService) { }

  ngOnInit(): void {
  }

  sendPayments()
  {
    this.paymentsService.doTransaction(this.paymentsInfo).subscribe();
  }
  closePayment()
  {
    this.isOpen$.emit();
  }
}
