import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {LoginModel} from "../../../_interfaces/login.model";
import {Router} from "@angular/router";
import {AuthenticatedResponse} from "../../../_interfaces/authenticated-response.model";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(private http:HttpClient, private router: Router) { }
 signUp:boolean = false;
 reg:boolean = false;

  invalidLogin: boolean;

  credentials: LoginModel = {name:'',phone:'',email:'', password:''};
  ngOnInit(): void {
  }
  openSign()
  {
    this.signUp = true;
    this.reg  = false;

  }
  OpenReg()
  {
    this.signUp = false;
    this.reg = true;

  }
  close()
  {
    this.signUp = false;
    this.reg = false;

  }

  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthenticatedResponse>("https://localhost:7006/api/auth/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            const refreshToken = response.refreshToken;
            localStorage.setItem("jwt", token);
            localStorage.setItem("refreshToken", refreshToken);
            this.invalidLogin = false;
            window.location.reload();
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
    }
  }

  myForm:FormGroup = new FormGroup({

    "userName": new FormControl("", [Validators.required,Validators.minLength(3)]),
    "userPhone": new FormControl("", [Validators.required]),
    "userEmail": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "userPassword": new FormControl("Tom", [Validators.required,Validators.pattern("[A-Za-z0-9]*"), Validators.minLength(8)]),

  });

  sd:string;
}
