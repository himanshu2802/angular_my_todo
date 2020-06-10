import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptopBasicAuthService implements HttpInterceptor{

  constructor(
    private basicAuthenticationService : BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let userName = 'himanshu'
    // let password = '123'
    // let basicAuthHeaderString  = 'Basic ' + window.btoa(userName + ':' + password)
    let basicAuthHeaderString  = this.basicAuthenticationService.getAuthenticatedToken()
    let userName = this.basicAuthenticationService.getAuthenticatedUser();
    
    if(basicAuthHeaderString && userName) {
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      })
    }
    
    return next.handle(request)
  }
}
