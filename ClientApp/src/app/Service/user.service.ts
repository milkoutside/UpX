import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Users} from "../Models/Users";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "auth";
  // @ts-ignore
  userInfo:BehaviorSubject<Users> = new BehaviorSubject<Users>();
  constructor(private http:HttpClient) { }

  createUser(User:Users):Observable<any>
  {
    return this.http
      .post<Users>(`${environment.apiUrl}/${this.url}/register`,User)

  }

  getUserInfo()
  {
      this.http.get<Users>(`${environment.apiUrl}/Users`).subscribe((res)=>this.userInfo.next(res));

  }

  isEmptyLocalStorage()
  {

    let lc = localStorage.getItem('jwt');
    if(lc)
    {
      return true
    }
    else {
      return false;
    }
  }
}
