import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public count = 0;
  constructor() { }


  updateCount(){
    this.count++;
  }
  getCount(){
    return this.count;
  }

}
