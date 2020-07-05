import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse ,HttpParams  } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public count    = 0;
  //public apiUrl   = "http://api.resfeber.online/api/v1/";
  public apiUrl   = "http://localhost:3000/api/v1/";
  constructor( 
    private http:HttpClient,
    private Cookie:CookieService
    ) { }


  //Signup 
  public signUp(data):any{
    return this.http.post(`${this.apiUrl}users/signUp`,data)
  }//Signup ends here...


   //SignIn  
   public signIn(data):any{
     //console.log(data);
     return this.http.post(`${this.apiUrl}users/signIn`,data)

  }//SignIn  ends here...

  public checkSession(){

    if(this.Cookie.get('authToken')=== "" || this.Cookie.get('authToken')=== undefined || this.Cookie.get('authToken')=== null )
    {
      return false;
    }else{
      return true;
    }

  }

  logout(){
    
  }


  addUserToLocalStorage(data){
    localStorage.setItem('userData',JSON.stringify(data));
  }
  getUserFromLocalStorage(){
    return localStorage.getItem('userData');
  }

}
