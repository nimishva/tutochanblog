import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';

import { MatBottomSheet } from '@angular/material';
import { MatMenu } from '@angular/material/menu'
import { ToastrService } from 'ngx-toastr';
import { SubscriptionWindowComponent } from '../subscription-window/subscription-window.component';

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
      private Cookie:CookieService,
      private popUp:MatBottomSheet,
      private toastr:ToastrService

      ) { }

  ngOnInit() {

      this.userData = this.mainService.getUserFromLocalStorage();

    if(!this.mainService.checkSession())
    {

      this.userLogged = false;

    }else{

      this.userLogged = true;
      this.username = this.userData.firstName;
      this.firstChar = this.username.charAt(0);
     // console.log(this.firstChar);

    }
     console.log(this.userLogged);
  }

  loadPost(){

     this.router.navigate(['/post']);  
  } //Load posts

  logout(){

     this.Cookie.deleteAll();
     this.userLogged = false;

  } //Logout ends here

  openSubscr()
  {
    this.popUp.open(SubscriptionWindowComponent);
  }//  

} //Main Class ends here
