import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameStairsService {

  arrayStairs:BehaviorSubject<boolean[]> = new BehaviorSubject<boolean[]>([]);
  url = "Stairs"
  constructor(private http:HttpClient) {
    this.getTemplateArray();
  }

  getArrayStairs() : void
  {
    this.http
      .get<boolean[]>(`${environment.apiUrl}/${this.url}`).subscribe((result)=>this.arrayStairs.next(result.reverse()));
  }

  getTemplateArray(){
    let array:any = [];
    let array2:any = [];

    for(let i = 0; i < 10; i++)
    {
      for(let j = 0; j < 5; j++)
      {
        array2[j] = false;
      }
      array[i] = array2;
    }
    this.arrayStairs.next(array);
  }
}
