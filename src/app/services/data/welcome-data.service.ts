import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class HelloWorldBean{

  constructor(
    public message: String
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http:HttpClient) { }

  getWelcomeData() {
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.get<HelloWorldBean>(`${API_URL}${APPROOT}/hello-world-bean1`);
    // console.log("getWelcomeData Service method");
  }

  getWelcomeDataWithPathVar(name) {

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()

    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })
    let API_URL = environment.baseUrl;
    let APPROOT = environment.appRoot;
    return this.http.get<HelloWorldBean>(`${API_URL}${APPROOT}/hello-world/path-variable/${name}`
                  //, {headers : header}
    );
    // console.log("getWelcomeData Service method");
  }

  createBasicAuthenticationHttpHeader() {
    let userName = 'himanshu'
    let password = '123'
    let basicAuthHeaderString  = 'Basic ' + window.btoa(userName + ':' + password)
    return basicAuthHeaderString
  }
}
