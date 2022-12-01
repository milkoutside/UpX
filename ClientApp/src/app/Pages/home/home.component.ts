import {Component, EventEmitter, OnInit} from '@angular/core';
import {BetService} from "../../Service/bet.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent{
  nb:number = 0;
  constructor() {
  }

asas()
{
  this.nb = this.nb + 1;
}


}
