import {Component, OnInit} from '@angular/core';
import {Games} from "../../Models/Games";

@Component({
  selector: 'app-games-card',
  templateUrl: './games-card.component.html',
  styleUrls: ['./games-card.component.css']
})
export class GamesCardComponent implements OnInit {
  games:Games[] = [];
  index:number = 3!;
  constructor() {}
  class:string[] = ["img-stairs","img-crash","img-coin"]!;
  path:string[] = ["stairs","crash",""]!
  name:string[] = ["Stairs","Crash","Coin Flip"]!;
  ngOnInit(): void {
    this.fillGames();
  }
  fillGames()
  {
    for(let i = 0; i < this.name.length; i++ )
    {
      this.games[i] = {class:this.class[i],path:this.path[i],name:this.name[i]}
    }
  }
}
