import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProdserService } from 'src/app/prodser.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit, OnDestroy {

 searchText:string;


  products:any[]=[];

  isLoading:boolean = true;

  msg:string
  pdtName: any;

myParamSubscription: Subscription;

  constructor(public pdtser:ProdserService, public activate: ActivatedRoute, public routing: Router, public userser: UserService) { }


  ngOnInit(): void {


    console.log("NgOninit");

   this.myParamSubscription = this.activate.params.subscribe((param:Params)=>{

      console.log(param);

      this.isLoading = true;
 
      if(param.catid){

        this.pdtser.getProductByCatwise(param.catid).subscribe((data:any)=>{

          this.isLoading = false;

          this.products = data
    
          console.log(data);
    
        },(error:any)=>{
    
          console.log(error)
        },()=>{
    
          console.log("Completed");
    
        });

      }
      else{

        this.pdtser.getProductsLists().subscribe((data:any[])=>{


          this.products = data

          this.isLoading = false;
    
        },(error:any)=>{
    
          console.log(error)
        },()=>{
    
          console.log("Completed");
    
        });
        
      }

    });

    this.pdtser.reaceviedMessage().subscribe((d)=>{

      this.searchText = d
    })
  
  }

  checkLogged(cartPdtId:number, cartpdtPrice:number){


    this.pdtser.addToMyCartItems(cartPdtId,cartpdtPrice).subscribe((data:string)=>{


      this.msg = data

      this.pdtser.updateCart.next("event emitted")

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

  ngOnDestroy(){

    this.myParamSubscription.unsubscribe();
  }
}
