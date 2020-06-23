import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { MatBottomSheetRef} from '@angular/material';

import { AuthService ,GoogleLoginProvider ,SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-pop-up-window',
  templateUrl: './pop-up-window.component.html',
  styleUrls: ['./pop-up-window.component.css']
})
export class PopUpWindowComponent implements OnInit {
  iconGoogle = faGoogle;
  constructor( private router:Router,
               private bottomSheetref:MatBottomSheetRef<PopUpWindowComponent>,
               private auth:AuthService
             ) { }

    ngOnInit() {


    } //NgOnint ends here


    ngOnDestroy(){
      this.auth.signOut();
    } //OnDestroy ends here



    redirect(opt){
      this.bottomSheetref.dismiss();
      this.router.navigate(['/signup']);
    } //Redirecting method

    signUpGoogle(){
     let signInData = this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
     signInData.then((user)=>{
        localStorage.setItem('user',user.email);
        this.bottomSheetref.dismiss();
     })
     .catch((err)=>{
       console.log(err);
     })
    } //Signup using google



}
