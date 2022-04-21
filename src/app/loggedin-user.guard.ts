import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinUserGuard implements CanActivate {

  constructor (public userser:UserService, public router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

      if (this.userser.idLoggedIn()) {
        // alert("you are alredy logged user")
        this.router.navigate(['/'])
        return false
     } 
     
      else {
        return true
     }
  
    }

    }
  
  

