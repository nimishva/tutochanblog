import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { MatBottomSheetRef} from '@angular/material';
import { MainService} from '../main.service';
import { FormControl , Validators, FormGroup } from '@angular/forms';

import { AuthService ,GoogleLoginProvider ,SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pop-up-window',
  templateUrl: './pop-up-window.component.html',
  styleUrls: ['./pop-up-window.component.css']
})
export class PopUpWindowComponent implements OnInit {
  iconGoogle = faGoogle;
  loginForm = new FormGroup({
    emailInput  : new FormControl('', [Validators.required,Validators.email]),
    password    : new FormControl('', [Validators.required])
  })
 


  constructor( 
               private router:Router,
               private bottomSheetref:MatBottomSheetRef<PopUpWindowComponent>,
               private auth:AuthService,
               private mainService:MainService,
               private cookie:CookieService,

             ) { }

    ngOnInit() {


    } //NgOnint ends here

    ngOnDestroy(){
     // this.auth.signOut();
    } //OnDestroy ends here



    getErrorMessage() {
      // if (this.loginForm.hasError('required')) {
      //   return 'You must enter a value';
      // }

      //   return this.email.hasError('email') ? 'Not a valid email' : '';
      //   return this.email.hasError('required') ? 'Enter Passwor' : '';

    }

    signIn(){

      let data = {
        password : this.loginForm.value.password,
        email    : this.loginForm.value.emailInput
      }

      this.mainService.signIn(data)
      .subscribe((response)=>{
        if(response.status == 200){
          console.log(response.data);
          this.cookie.set('authToken',response.data.authToken);
          this.mainService.addUserToLocalStorage(response.data.userDetails);
          this.bottomSheetref.dismiss(response);
        }else{
          console.log(response.message);
        }
      })

    } //Signin ends here



    redirect(opt){
      this.bottomSheetref.dismiss();
      this.router.navigate([opt]);
    } //Redirecting method

    signUpGoogle(){
        let signInData = this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
        signInData.then((user)=>{
        console.log(user);
     
        let data = {
          password  : "",
          name      : user.firstName,
          lastName  : user.lastName,
          email     : user.email,
          signUptype: "social" 
        }

        this.mainService.socialSignIn(data)
        .subscribe((response)=>{
          if(response.status == 200){
            this.cookie.set('authToken',response.data.token);
            this.mainService.addUserToLocalStorage(response.data.userData);
            this.bottomSheetref.dismiss(response);
            console.log(response);
          }else{
            console.log(response.message);
          }
          
        })
        //this.mainService.addUserToLocalStorage(user.email);
        //this.bottomSheetref.dismiss();
     })
     .catch((err)=>{
       console.log(err);
     })
    } //Signup using google



}
