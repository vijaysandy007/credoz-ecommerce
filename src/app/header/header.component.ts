
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from, Subject } from 'rxjs';
import { ProdserService } from '../prodser.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userSer: UserService, public myRouter:Router, public prodUser:ProdserService, public activated: ActivatedRoute) { }

 checking:any;

 cartCount: number =0;

 loggedUser:any




  ngOnInit(): void {

    this.getProductCount();

    this.prodUser.updateCart.subscribe((data:any)=>{

          this.getProductCount();
     }) 
 
  }

  getProductCount(){

    this.prodUser.getCartCount().subscribe((data:number)=>{
 
      this.cartCount = data;
    })
  }

  logOut(){

    this.cartCount = 0;

    localStorage.clear();

    this.myRouter.navigateByUrl("/login");

  }

  sendMessage(message:any){

    this.prodUser.sendMessage(message);
  }

}
