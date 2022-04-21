import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdserService } from '../prodser.service';



import { UserService } from '../user.service';

declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
UsenameAvail:boolean=true

usernameAvailCheck:boolean= true
usernameNot:boolean=true

  msg: any;
  userOutput: any
  check: any[] = []
  fName: any
  fPass: any
  

  constructor(public ps1: UserService, public myRouter: Router, public pdtser: ProdserService) { }

  ngOnInit(): void {

    $('.toggle').click(() => {
      // Switches the Icon
      $(this).children('i').toggleClass('fa-pencil');
      // Switches the forms  
      $('.form').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: "toggle"
      }, "slow");
    });

    this.loginForm = new FormGroup({

      'Username': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'Password': new FormControl(null, [Validators.required, Validators.minLength(3)]),

    });

  }

  get usernameCtrl() {
    return this.loginForm.get("Username");
  }

  get passwordCtrl() {
    return this.loginForm.get("Password");
  }


  userNameCheck(userCheck: any) {

    this.ps1.findUserName(userCheck).subscribe((userdata: any) => {

      console.log(userdata)

      this.check = userdata

      for(var i=0; i<this.check.length; i++){

        if (userCheck == userdata[i].Username) {

          // this.userOutput = "Username alredy taken";
     
          this.UsenameAvail = true

          this.usernameAvailCheck = false
          this.usernameNot = true
         

        }
  
        else if (userCheck == 0) {
          this.userOutput = "User Box is empty";
          this.usernameNot = true
          this.usernameAvailCheck = true
        }
  
        else {
          // this.userOutput = "Congrats UserName Available";
          this.UsenameAvail = false
          this.usernameNot = false
          this.usernameAvailCheck = true
        }
        
      }

    

    }, (error: any) => {

      console.log(error);

      this.msg = "Some Thing went wrong"

    });

  }


  submitbtn(data: NgForm) {


    this.ps1.reacvingData(data.value).subscribe((data: string) => {

      console.log(data);

      this.msg = data;
 
      


    }, (error: any) => {
      console.log(error);

      this.msg = "something went worng"


    });

    data.reset();
  }

  loginBtn() {

    this.ps1.userLogin(this.loginForm.value).subscribe((data: string) => {

      //this.msg = data;

      console.log(data);

      if (data.length > 0) {
               
        localStorage.setItem("loggeduser", data);

        this.pdtser.updateCart.next("user Logged");
       
        this.myRouter.navigateByUrl("/");
        
        
      }

      else {
        this.msg = "Inavlid Username"
      }

    }, (error: any) => {

      console.log(error);

      this.msg = "Some Thing went wrong"

    })

    console.log(this.loginForm.value)


  }

}
