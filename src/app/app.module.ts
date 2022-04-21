import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoryComponent } from './category/category.component';
import { AddProductsComponent } from './Products/add-products/add-products.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthguardGuard } from './authguard.guard';
import { LoggedinUserGuard } from './loggedin-user.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { ProddetialsComponent } from './proddetials/proddetials.component';

import { FilterPipe } from './shared/filter.pipe';
import { EventsComponent } from './events/events.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoryComponent,
    AddProductsComponent,
    FooterComponent,
    LoginComponent,
    NotfoundComponent,    
    ProddetialsComponent,
    
    FilterPipe,
    EventsComponent,
    
   
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthguardGuard,LoggedinUserGuard,
  {provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptorService,
   multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

