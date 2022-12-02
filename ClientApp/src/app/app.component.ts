import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenService} from "./Service/token.service";
import {AuthenticatedResponse} from "./_interfaces/authenticated-response.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private jwtHelper:JwtHelperService, private tokenService:TokenService) {
  }
  token = localStorage.getItem("jwt")!;
  refreshToken = localStorage.getItem("refreshToken")!;
  credentials = JSON.stringify({ accessToken: this.token, refreshToken: this.refreshToken });


  ngOnInit(): void {
    if
    (this.jwtHelper.isTokenExpired(this.token) && this.refreshToken)
    {
      this.tokenService.refreshToken(this.credentials).subscribe({
        next: (res: AuthenticatedResponse) => {
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("refreshToken", res.refreshToken);},
        error: (_) => {localStorage.removeItem("jwt"); localStorage.removeItem("refreshToken")}
      });
    }
  }

}
