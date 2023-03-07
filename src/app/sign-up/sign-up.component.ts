import {Component} from '@angular/core';
import {HttpService} from "../http-service.service";

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiResponse, Token} from "../type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [HttpService],
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public signUpForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    passwordRepeat: new FormControl(null, Validators.compose([
      Validators.required,
      Validators.minLength(8),
    ]))
  });


  constructor(
    private httpService: HttpService,
    private _router: Router,
  ) {
  }

  isPasswordRepeated(): boolean {
    return this.signUpForm.controls.password.value == this.signUpForm.controls.passwordRepeat.value;
  }

  usernameControl = () => this.signUpForm.controls.username;
  passwordControl = () => this.signUpForm.controls.password;
  passwordRepeatControl = () => this.signUpForm.controls.passwordRepeat;

  sendForm() {
    this.httpService.postData<Token>("/backend/api/auth/register", {
      username: this.signUpForm.getRawValue().username,
      password: this.signUpForm.getRawValue().password
    }).subscribe(
      (res: Token) => {
        if (!!res.token) localStorage.setItem('token', res.token);
        this._router.navigate(['/'])
      }
    )
  }
}
