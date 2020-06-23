import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { PopUpWindowComponent } from './pop-up-window/pop-up-window.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-app';


  constructor(public popUp:MatBottomSheet){

  }

  ngOnInt(){
   
  }

  openPopup(){
    this.popUp.open(PopUpWindowComponent,{
      
    });
  }



}
