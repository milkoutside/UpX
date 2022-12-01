import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Payments} from "../_interfaces/payments";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  url = 'Payment';
  constructor(private http:HttpClient) { }

  doTransaction(payments:Payments) : Observable<any>
  {
    return this.http.post(`${environment.apiUrl}/${this.url}`,payments);
  }
  getListTrasaction():Observable<Payments[]>
  {
    return this.http.get<Payments[]>(`${environment.apiUrl}/${this.url}`);
  }
}
