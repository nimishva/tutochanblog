import { Component, OnInit ,HostListener, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatBottomSheet } from '@angular/material';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
import { MainService } from '../main.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  loggedUser;
  showUserProfileMenu = false;
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    let scrollPosition = window.pageYOffset;
    this.loggedUser = this.mainService.getUserFromLocalStorage();
    // console.log(this.loggedUser);
    if(!this.mainService.checkSession()){
      if(scrollPosition >= (max - (max/1.8)))
      {
        const bt = this.popUp.open(PopUpWindowComponent,{
          disableClose:true
        });   

        bt.afterDismissed().subscribe((data)=>{
          console.log(data);
          if(data.status == 200){
            console.log("Logged from bottom sheet");
            this.showUserProfileMenu = true;
          }else{
            console.log(data.message);
            this.showUserProfileMenu = false;
          }
          
        })
      } // Checking scroll position
    }

    } // onWindowScroll ends heres

   
  

  constructor( private popUp:MatBottomSheet,
               private mainService:MainService 
              ) { }

  ngOnInit(): void {
    if(this.mainService.checkSession()){
      this.showUserProfileMenu = true
    }
    this.loggedUser = localStorage.getItem('userData');
    //console.log(this.loggedUser)
  
  } //ngOnInit

  showHideNavBar(event){
    console.log(event);
    this.showUserProfileMenu = event;
  }

}

