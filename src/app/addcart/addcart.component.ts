import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdserService } from '../prodser.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit {

  constructor(public userSer: UserService, public router : Router, public prodser: ProdserService, public activated: ActivatedRoute) { }

   productArray:any[]=[];

   searchText:string;
  msg:string

   myCartFinalPrice:number;

   minusbtn:boolean = true
   
   deliverCharges:number =10

  ngOnInit(): void {

    this.userSer.getMyCartItems().subscribe((data:any[])=>{
      console.log(data)

      
    this.productArray = data    

    this.myCartFinalPrice =0;

      for(let x in this.productArray){

        this.myCartFinalPrice += this.productArray[x].cartpdtPrice;

      }

    },(error)=>{
      console.log(error)

      if(error.status === 401){

        localStorage.clear();

        this.router.navigateByUrl("/login");
      }
    })
  
  
  }

 

  updateCart(cartId:number, cartPdtQty:number, pdtPrice:number){

    this.prodser.updateMyCartItem(cartId,cartPdtQty,pdtPrice).subscribe((data:string)=>{


    this.msg = data

    var index =  this.productArray.findIndex((obj)=>{

        return cartId === obj._id;

    });

    this.productArray[index].cartPdtQty = cartPdtQty;
    this.productArray[index].cartpdtPrice = cartPdtQty * pdtPrice;

    this.myCartFinalPrice =0;

      for(let x in this.productArray){

        this.myCartFinalPrice += this.productArray[x].cartpdtPrice;

      }

    },(error:any)=>{

      this.msg = "some thing went wrong";
    });
  }



  minusCart(cartId:number, cartPdtQty:number, pdtPrice:number){



    this.prodser.updateMyCartItem(cartId,cartPdtQty,pdtPrice).subscribe((data:string)=>{


      this.msg = data
  
      var index =  this.productArray.findIndex((obj)=>{
  
          return cartId === obj._id;
  
      });
  
      this.productArray[index].cartPdtQty = cartPdtQty;
      this.productArray[index].cartpdtPrice = cartPdtQty * pdtPrice;
  
      this.myCartFinalPrice =0;
  
        for(let x in this.productArray){
  
          this.myCartFinalPrice += this.productArray[x].cartpdtPrice;
  
        }
  
      },(error:any)=>{
  
        this.msg = "some thing went wrong";
      });


  }

  removeCart(cartId:number){

    this.prodser.removeCartItem(cartId).subscribe((data:string)=>{

      this.msg = data;

      this.prodser.updateCart.next("product removed");

   this.productArray = this.productArray.filter((obj)=>{

        return cartId !== obj._id;

      });

      this.myCartFinalPrice =0;

      for(let x in this.productArray){

        this.myCartFinalPrice += this.productArray[x].cartpdtPrice;

      }


    }, (error:any)=>{
      this.msg = "Something went wrong"
    });
  }

}
 