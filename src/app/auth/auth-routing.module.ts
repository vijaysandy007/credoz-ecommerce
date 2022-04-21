import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcartComponent } from '../addcart/addcart.component';
import { AddproductsComponent } from '../addproducts/addproducts.component';

import { AuthguardGuard } from '../authguard.guard';

const routes: Routes = [
  {path: "", children: [
    {path:"myCart",component:AddcartComponent,canActivate:[AuthguardGuard]},
  {path:"addproducts",component:AddproductsComponent,canActivate:[AuthguardGuard]},
 
 

  
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
