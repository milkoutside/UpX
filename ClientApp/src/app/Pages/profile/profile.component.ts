import { Component, OnInit } from '@angular/core';
import {UserService} from "../../Service/user.service";
import {Users} from "../../Models/Users";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo:Users;
  constructor(private userService:UserService) {
    this.userService.userInfo.forEach((res)=>this.userInfo = res);
  }

  ngOnInit(): void {
    this.userService.getUserInfo();
  }

}
