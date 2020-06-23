import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() navBar = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

      this.navBar.emit("false");

      console.log(navigator.geolocation);

  }

}
