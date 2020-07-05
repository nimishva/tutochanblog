import { Component, OnInit, Input,SimpleChange, Output, EventEmitter } from '@angular/core';
import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  @Output() userLogged = new EventEmitter;
  userData;
  username;
  firstChar
  constructor(

    private mainService:MainService,
    private Cookie:CookieService

  ) { }

  ngOnInit() {

       this.userData = JSON.parse(this.mainService.getUserFromLocalStorage());
        console.log(this.userData);
      if(this.mainService.checkSession()){

        this.userLogged.emit(true);
        this.username = this.userData.firstName;
        this.firstChar = this.username.charAt(0);

      }

        console.log("Navigation Bar "+this.userLogged);
  }// Ngonit ends here

  ngOnChanges(changes:SimpleChange){
    console.log(changes);
  }


  logout(){

    this.Cookie.deleteAll();
    this.userLogged.emit(false);

  }


}
