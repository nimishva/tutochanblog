import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public count = 0;
  constructor() { }


  addUserToLocalStorage(data){
    localStorage.setItem('userData',data);
  }
  getUserFromLocalStorage(){
    return localStorage.getItem('userData');
  }

}
