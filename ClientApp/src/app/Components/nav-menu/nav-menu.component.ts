import {Component, OnInit} from '@angular/core';
import {UserService} from "../../Service/user.service";
import {Users} from "../../Models/Users";


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit{
  constructor(private userService:UserService) {
    this.userService.userInfo.forEach((res)=>this.userInfo = res);
  }
  userInfo:Users;
  isExpanded = false;
  aut = this.userService.isEmptyLocalStorage();
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.userService.getUserInfo();

  }

}
