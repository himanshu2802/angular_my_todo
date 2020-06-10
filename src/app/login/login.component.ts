import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../services/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../services/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName= 'himanshu'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidUser = false

  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthenticationService : BasicAuthenticationService
    ) { }

  handleClick(){

    if(this.hardcodedAuthenticationService.authenticate(this.userName, this.password)){
      this.invalidUser = false
      this.router.navigate(['welcome', this.userName])
    }
    else {
      this.invalidUser = true
    }
    console.log(this.userName);
    console.log(this.password);

  }

  handlebasicAuthClick(){

    this.basicAuthenticationService.executeAuthenticationService(this.userName, this.password)
          .subscribe(
            response => {
              console.log(response)
              this.invalidUser = false
              this.router.navigate(['welcome', this.userName])
            }, 
            error => {
              console.log(error)
              this.invalidUser = true
            }
          )
  }

  handleJwtAuthClick(){

    this.basicAuthenticationService.executeJwtAuthenticationService(this.userName, this.password)
          .subscribe(
            response => {
              console.log(response)
              this.invalidUser = false
              this.router.navigate(['welcome', this.userName])
            }, 
            error => {
              console.log(error)
              this.invalidUser = true
            }
          )
  }

  ngOnInit(): void {
  }

}
