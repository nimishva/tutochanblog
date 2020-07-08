import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { MainService } from '../main.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { differenceInDays } from 'date-fns';
import { MatBottomSheet } from '@angular/material';
import { SubscriptionWindowComponent } from '../subscription-window/subscription-window.component';

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
               private toaster:ToastrService,
               private popUp:MatBottomSheet
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
          console.log(response);
      if(response['status'] == 200){
          this.cookie.set('authToken',response['data'].authToken);
          response['data'].userDetails['clickCount'] = 0;
          let userData = this.mainService.getUserFromLocalStorage();
          if(!userData){
            this.mainService.addUserToLocalStorage(response['data'].userDetails);
          }else if(response['data'].userDetails['email'].emailId != userData.emailId){
            this.mainService.addUserToLocalStorage(response['data'].userDetails);
          }

          let createdDate = new Date(response['data'].userDetails.createdOn);
          let currentDate = new Date();
          //differenceInDays(new Date(response['data'].userDetails.cteatedOn),new Date())
          let days = differenceInDays(currentDate,createdDate);
          if(days > 7){
            this.toaster.success("Free trial limit exceeded ,Please subscribe",'',{
              timeOut: 2000,
              positionClass:'toast-top-center'
            });
            let bt = this.popUp.open(SubscriptionWindowComponent);
            bt.afterDismissed().subscribe(()=>{
              this.router.navigate(['/home']);
            })
          }else{
            this.toaster.success("Redirecting",'',{
              timeOut: 1000
            });
            setTimeout(()=>{
              this.router.navigate(['/home']);
            },1000)
          }
      
            
      }else{
        this.toaster.error(response['message'])
      }
      })
  }

}
