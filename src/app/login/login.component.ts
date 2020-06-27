import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() navBar = new EventEmitter<string>();

  constructor( private mainService:MainService,
               private router:Router,
               private cookie:CookieService
    ) { }

  ngOnInit(): void {

      this.navBar.emit("false");

      console.log(navigator.geolocation);

  }

  onSubmit(form:NgForm){

    let data = {
      password : form.value.password,
      email    : form.value.email
    }

      this.mainService.signIn(data)
      .subscribe((response)=>{

      if(response['status'] == 200){
          this.cookie.set('authToken',response['data'].authToken);
          response['data'].userDetails['clickCount'] = 0;
          let userData = this.mainService.getUserFromLocalStorage();
          if(!userData){
            this.mainService.addUserToLocalStorage(response['data'].userDetails);
          }
            this.router.navigate(['/home']);
      }
      })
  }

}
