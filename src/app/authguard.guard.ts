import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(public userSer: UserService, public myRoueter: Router){}

  canActivate():boolean{

    if(this.userSer.idLoggedIn()){
    
        return true;
    }
   
    else{
      this.myRoueter.navigate(["/login"])
      return false
    }
  }
  
}
