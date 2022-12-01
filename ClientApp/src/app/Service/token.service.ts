import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticatedResponse} from "../_interfaces/authenticated-response.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http:HttpClient) { }

  refreshToken(credentials:string) : Observable<any>
  {
   return  this.http.post<AuthenticatedResponse>("https://localhost:7006/api/token/refresh", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
  })
  }
}
