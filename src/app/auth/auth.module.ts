import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { AddproductsComponent } from '../addproducts/addproducts.component';
import { AddcartComponent } from '../addcart/addcart.component';




@NgModule({
  declarations: [
    AddproductsComponent,
    AddcartComponent,
    
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
