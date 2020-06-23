import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private mainService:MainService) { }

  ngOnInit(): void {

  }

  loadPost(){
    console.log(this.mainService.getCount())
    if(this.mainService.getCount() >= 3){
      this.router.navigate(['/login']);
    }else{
      this.mainService.updateCount();
      this.router.navigate(['/post']);
    }

  }

}
