import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() navBar = new EventEmitter<string>();

  constructor( private mainService:MainService,
               private router:Router,
               private cookie:CookieService,
               private toaster:ToastrService
    ) { }

  ngOnInit(): void {

      this.navBar.emit("false");

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
          let userData = JSON.parse(this.mainService.getUserFromLocalStorage());
          if(!userData){
            this.mainService.addUserToLocalStorage(response['data'].userDetails);
          }else if(response['data'].userDetails['email'].emailId != userData.emailId){
            this.mainService.addUserToLocalStorage(response['data'].userDetails);
          }
            this.toaster.success("Redirecting",'',{
              timeOut: 1000
            });
            setTimeout(()=>{
              this.router.navigate(['/home']);
            },1000)
            
      }else{
        this.toaster.error(response['message'])
      }
      })
  }

}
