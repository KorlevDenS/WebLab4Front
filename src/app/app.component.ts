import { Component } from '@angular/core';
import {HttpService} from "./http-service.service";
import {Token} from "./type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _httpService: HttpService
  ) {}
  logout() {
    // this.local
  }
}
