import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const TOKEN = 'token'
export const AUTH_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(
    private http : HttpClient, 
  ) { }

  executeAuthenticationService(userName, password) {

    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader(userName, password)
    let URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(
                  `${URL}${APPROOT}/authenticate`,
                  {headers : header}).pipe(
                    map(
                      data => {
                        sessionStorage.setItem(AUTH_USER, userName);
                        sessionStorage.setItem(TOKEN, basicAuthHeaderString);
                        return data;
                      }
                    )
                  );
    // console.log("getWelcomeData Service method");
  }

  executeJwtAuthenticationService(userName, password) {

    let URL = environment.baseUrl;
    let APPROOT = environment.appRoot;

    return this.http.post<any>(
                  `${URL}${APPROOT}/authenticate`,
                  {userName, password}).pipe(
                    map(
                      data => {
                        sessionStorage.setItem(AUTH_USER, userName);
                        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
                        return data;
                      }
                    )
                  );
    // console.log("getWelcomeData Service method");
  }

  createBasicAuthenticationHttpHeader(userName, password) {
    let basicAuthHeaderString  = 'Basic ' + window.btoa(userName + ':' + password)
    return basicAuthHeaderString
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthenticatedToken() {
    if(this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN)
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTH_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(TOKEN);
  }

}

export class AuthenticationBean {

  constructor(public message : string){}
}