import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MainService } from '../main.service';
declare let Razorpay:any;
@Component({
  selector: 'app-subscription-window',
  templateUrl: './subscription-window.component.html',
  styleUrls: ['./subscription-window.component.css']
})
export class SubscriptionWindowComponent implements OnInit {


  razorPayOptions = {
    "key": "rzp_test_PDt9MP7gIRoNOH", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "TutoChan",
    "description": "Test Transaction",
    "image": "",
    "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": this.razorHandler,
    "prefill": {
        "name": "Nimish V A",
        "email": "nimish.va@gmail.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#F37254"
    }
  }

  constructor(

    private mainService : MainService,
    private bottomSheetref:MatBottomSheetRef<SubscriptionWindowComponent>,
    

  ) { 




  }

  ngOnInit() {
  }

  checkOut(){
    

  this.mainService.getRazorPayOrderId({})
  .subscribe((repsonse)=>{
    console.log(repsonse);
    this.razorPayOptions.order_id = repsonse.order_id;
    let rzrp = new Razorpay(this.razorPayOptions)
    rzrp.open();
  })
  
  console.log("Open");

  } //Checkout ends here

  razorHandler(res){
    console.log(res);
  }

}
