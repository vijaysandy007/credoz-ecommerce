import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdserService } from '../prodser.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit {

  dropDown:any="select Category"

  selectedImage:any;

  msg:string;

  constructor(public pdstr: UserService, public productSer : ProdserService, public activeRoute: ActivatedRoute) { }

  categories:any[]=[];

  ngOnInit(): void {

    console.log(this.activeRoute.params);

    this.pdstr.getCategories().subscribe((data:any[])=>{

      this.categories = data

    })

  }

  selectImage(event:any){

    //console.log(event);

    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
  }

  addProducts(formRef:NgForm){


    console.log(formRef.value)

    var fd = new FormData();

  fd.append("pdtCatId", formRef.value.catId);
  fd.append("pdtName", formRef.value.pdtName);
  fd.append("pdtPrice", formRef.value.prodPrice);
  fd.append("pdtDesc", formRef.value.prodDesc);

  fd.append("pdtImage", this.selectedImage, "productImage");
    
  this.productSer.addProductsH(fd).subscribe((data:string)=>{
    console.log(data);
    
    this.msg = data
    
  },(error)=>{
    console.log(error)
  });


  }

    
}
