import { Injectable } from '@angular/core';
import {  CanActivate, Router  } from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdmingaurdGuard implements CanActivate {

  constructor(public userser: UserService, public routing: Router) {}

  canActivate(): boolean {

    if(this.userser.isAdminLogin()){

      return true;
    }
    else{
      this.routing.navigate(["/admin"])
      alert("Admin Only Can Add The products")
      return false
    }

   
  }
  
}
