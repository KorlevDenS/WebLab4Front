import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Token} from "../type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [HttpService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    }
  )

  constructor(private httpService: HttpService,
              private _router: Router) {
  }

  usernameControl = () => this.loginForm.controls.username;
  passwordControl = () => this.loginForm.controls.password;

  sendForm() {
    this.httpService.postData<Token>("/backend/api/auth/login", {
      username: this.loginForm.getRawValue().username,
      password: this.loginForm.getRawValue().password
    }, true).subscribe(
      (res: Token) => {
        if (!!res.token) localStorage.setItem('token', res.token);
        this._router.navigate(['/'])
      }
    )
  }
}
