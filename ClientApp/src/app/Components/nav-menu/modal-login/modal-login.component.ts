import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticatedResponse} from "../../../_interfaces/authenticated-response.model";
import {UserService} from "../../../Service/user.service";
import {Users} from "../../../Models/Users";

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  constructor(private userService:UserService) { }
   signUp:boolean = false;
   reg:boolean = false;

  credentials: Users = new Users();
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

  LoginForm:FormGroup = new FormGroup({
    "userName": new FormControl("", [Validators.required,
      Validators.minLength(3)]),
    "userPassword": new FormControl("", [Validators.required,
      Validators.pattern("[A-Za-z0-9]*"), Validators.minLength(8)]),
  })
  RegistrationForm:FormGroup = new FormGroup({

    "userName": new FormControl("", [Validators.required,Validators.minLength(3)]),
    "userPhone": new FormControl("", [Validators.required]),
    "userEmail": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "userPassword": new FormControl("", [Validators.required,Validators.pattern("[A-Za-z0-9]*"), Validators.minLength(8)]),

  });

  endRegistration()
  {
    this.credentials.name = this.RegistrationForm.controls['userName'].value;
    this.credentials.phone = this.RegistrationForm.controls['userPhone'].value;
    this.credentials.email = this.RegistrationForm.controls['userEmail'].value;
    this.credentials.password = this.RegistrationForm.controls['userPassword'].value;
    this.userService.createUser(this.credentials).subscribe({
      next:()=>{
        alert("Регистрация завершена")
      },
      error:(err)=>{ alert(err)}
    });
  }
  endLogin()
  {
    this.credentials.phone = this.LoginForm.controls['userName'].value;
    this.credentials.name = "";
    this.credentials.password = this.LoginForm.controls['userPassword'].value;
    this.userService.loginUser(this.credentials).subscribe({
      next: (response: AuthenticatedResponse) => {
        const token = response.token;
        const refreshToken = response.refreshToken;
        localStorage.setItem("jwt", token);
        localStorage.setItem("refreshToken", refreshToken);
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => alert(err)
    })
  }
}
