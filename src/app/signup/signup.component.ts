import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm} from '@angular/forms'
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name;
  constructor(
    
    private mainService:MainService,
    private router:Router,
    private toaster:ToastrService

    ) { }

  ngOnInit(): void {
  } //ngOnInit ends here

  onSubmit(form:NgForm){
    console.log(form.value);
    let data = {
      password  : form.value.password,
      name      : form.value.name,
      email     : form.value.email,
      signUptype: "" 
    }

    let resposne = this.mainService.signUp(data);
    resposne.subscribe((response)=>{
      console.log(response);
      if(response.status === 200){
        this.toaster.success("User created",'',{
          timeOut:1000
        });
        this.router.navigate(['/login']);
      }else{
        this.toaster.error(response.message);
      }
    })

  }//Signup submit method ends here

}
