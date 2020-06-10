import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

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

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world-bean1`);
    // console.log("getWelcomeData Service method");
  }

  getWelcomeDataWithPathVar(name) {

    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()

    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`
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
