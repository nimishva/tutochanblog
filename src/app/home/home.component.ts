import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';

import { MatMenu } from '@angular/material/menu'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLogged = false;
  userData;
  firstChar:string;
  username:string;

  constructor( 
    
      private router:Router,
      private mainService:MainService,
      private Cookie:CookieService

      ) { }

  ngOnInit() {

      this.userData = JSON.parse(this.mainService.getUserFromLocalStorage());

    if(!this.mainService.checkSession())
    {
      this.userLogged = false;
    }else{

      this.userLogged = true;
      this.username = this.userData.firstName;
      this.firstChar = this.username.charAt(0);
     // console.log(this.firstChar);

    }
    console.log(this.userData);
  }

  loadPost(){

      if((this.userData.clickCount >= 3) && (!this.userData.subscribed)){
        alert("Subscribe");
      }else{
        this.userData.clickCount += 1;
        this.mainService.addUserToLocalStorage(this.userData);
        this.router.navigate(['/post']);  
      }
    
  }

  logout(){
    this.Cookie.deleteAll();
    this.userLogged = false;
  }

}
