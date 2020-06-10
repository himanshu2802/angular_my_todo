import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../services/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  messageFromService: String;
  errorFromService: string
  constructor(
    private route:ActivatedRoute,
    private service:WelcomeDataService) { }

  ngOnInit() {
    this.name = this.route.snapshot.params['name']
  }

  getMyTodos() {
    console.log(this.service.getWelcomeData());
    this.service.getWelcomeData().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
    // console.log("get my Todos");
  }

  getWelcomeWithParam() {
    this.service.getWelcomeDataWithPathVar(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response) {
    this.messageFromService = response.message;
    console.log(response);
    console.log(response.message);
  }

  handleErrorResponse(error) {
    console.log(error);
    this.errorFromService = error.error.message;
  }

}
