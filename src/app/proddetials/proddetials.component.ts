import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProdserService } from '../prodser.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-proddetials',
  templateUrl: './proddetials.component.html',
  styleUrls: ['./proddetials.component.css']
})
export class ProddetialsComponent implements OnInit {

  constructor(public activated: ActivatedRoute, public prodser:ProdserService, public userser: UserService, public routing:Router) { }

  prodDetials:any[]=[];

  searchText:string;

  msg:any
  ngOnInit(): void {

    this.activated.params.subscribe((parm:Params)=>{

          this.prodser.getProductDetials(parm.prodid).subscribe((data:any[])=>{

            var index = data.length -1

          this.prodDetials = data[0]

          console.log(index)
           
         })

    })

    this.prodser.reaceviedMessage().subscribe((d)=>{

      this.searchText = d
    })

  }

  checkLogged(cartPdtId:number, cartpdtPrice:number){


    this.prodser.addToMyCartItems(cartPdtId,cartpdtPrice).subscribe((data:string)=>{


      this.msg = data

      this.prodser.updateCart.next("event emitted")

    },(error)=>{
      console.log(error)

      this.msg = "some thing went wrong"
    })

 
    if(this.userser.idLoggedIn()){

    }

    else{
      this.routing.navigateByUrl("/login")

      alert("Your Not Logged User Please Login")
    }
    

  }

  
  }


