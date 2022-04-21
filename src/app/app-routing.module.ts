import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from './header/header.component';
import { LoggedinUserGuard } from './loggedin-user.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProddetialsComponent } from './proddetials/proddetials.component';
import { AddProductsComponent } from './Products/add-products/add-products.component';


const routes: Routes = [
  {path:"",component:AddProductsComponent},
  {path:"getCategories",redirectTo:"",pathMatch:"full"},
  {path:"getCategories/:catid",component:AddProductsComponent},
  {path:"search/:searchterm", component:HeaderComponent},
  {path:"login",component:LoginComponent,canActivate:[LoggedinUserGuard]},
  {path:"proddetial",redirectTo:"",pathMatch:"full"},
  {path:"proddetial/:prodid",component:ProddetialsComponent},
  {path:"events",component:EventsComponent},
  {path:"auth", loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path:"**",component:NotfoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
