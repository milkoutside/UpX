import {Component} from '@angular/core';
import {Games} from "../../Models/Games";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent{
  games:Games = new Games();
  constructor() {
  }




}
