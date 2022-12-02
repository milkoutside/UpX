import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bets} from "../Models/Bets";

@Injectable({
  providedIn: 'root'
})
export class BetService {
  url = "Bet"
  constructor(private http:HttpClient) { }

  makeBet(bets:Bets) : Observable<any>
  {
    return this.http
      .post("https://localhost:7006/api/bet/acceptBet",bets)

  }
  paymentWin(bets:Bets) : Observable<any>
  {
    return this.http
      .post("https://localhost:7006/api/bet/paymentWin",bets)

  }
}
