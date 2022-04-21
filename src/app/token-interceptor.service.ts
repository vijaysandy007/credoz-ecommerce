import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public userSer: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    var tokenizedReq = req.clone({

      setHeaders : {
        myauthtoken : (this.userSer.getUserToken()) ? this.userSer.getUserToken() : ''
      }

    });
    
    console.log("Your req on its way");

    return next.handle(tokenizedReq)
  }

}
