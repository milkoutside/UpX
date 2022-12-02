import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

import {GameStairsService} from "../../../Service/game-stairs.service";
import {Observable} from "rxjs";
import {UserService} from "../../../Service/user.service";
import {BetService} from "../../../Service/bet.service";
import {Bets} from "../../../Models/Bets";


@Component({
  selector: 'app-stairs',
  templateUrl: './stairs.component.html',
  styleUrls: ['./stairs.component.css']
})
export class StairsComponent implements OnInit {
  color:any;
  arrayStairs:Observable<any[]>;
  isDisabled:any[] = [];
  isAuth = this.userService.isEmptyLocalStorage();
  defeat:boolean = false;
  gameStart:boolean = false;
  bets:Bets = new Bets();
  next = 9;
  coff = [368.83,150.73,69.94,27.97,11.19,6.71,4.02,2.42,1.93,1.55];
  constructor(private stairsService:GameStairsService,private userService:UserService,private betService:BetService) {
    this.arrayStairs = this.stairsService.arrayStairs;
  }

  ngOnInit(): void {
    this.createDisabled();
  }


  showCell(ev:any, cell:any){
    this.bets.coefficient = this.coff[this.next];
    if(cell)
    {
      ev.target.classList.add("good-mines");
      this.next = this.next - 1;
      this.isDisabled[this.next] = false;
      this.isDisabled[this.next + 1] = true;
    }
    else
    {
      this.isDisabled[this.next] = true;
      ev.target.classList.add("mines");
      this.defeat = true;
      this.gameStart = false;
      this.userService.getUserInfo();
      this.createDisabled()
    }

  }

  start()
  {
    this.betService.makeBet(this.bets).subscribe({
      next: () => {
        this.stairsService.getArrayStairs();
        this.next = 9;
        this.defeat = false;
        this.isDisabled[9] = false;
        this.userService.getUserInfo();
        this.gameStart = true;
      },
      error: (err: HttpErrorResponse) => window.alert(err.error)
    })
  }
  takeWin()
  {
    console.log(this.bets.coefficient)
    this.betService.paymentWin(this.bets).subscribe();
    this.gameStart = false;
    this.defeat = true;
    setTimeout(()=>{this.userService.getUserInfo();},100)
    this.createDisabled()
  }
  createDisabled() {
    for (let i=0; i<10;i++)
    {
      let ArrayCells = [];
      for(let j=0; j<5;j++)
      {
        ArrayCells[j] = true;

      }
      this.isDisabled.push(ArrayCells)
    }

  }

}
