import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {LoginRequestModel} from 'src/app/models/login-request-model';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router) { }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    let model = new LoginRequestModel(
      this.email.value!,
      this.password.value!);

    this.userService.login(model).subscribe({
      next: (v) => {
        if (v.data != null) {
          window.sessionStorage.removeItem("TOKEN_KEY");
          window.sessionStorage.setItem("TOKEN_KEY", v.data.token);

          this.router.navigate(["products"]);
        } else if (v.response != null) {
          this.messageService.add({
            severity: "warn",
            detail: `${v.response.message}`
          });
        } else if (v.errors != null) {
          this.messageService.add({
            severity: "error",
            detail: `${v.errors.join('\n')}`
          });
        }
      },
      error: (e) => {
        this.messageService.add({
          severity: "error",
          detail: "Something went wrong"
        });

        console.info(e);
      }
    });
  }
}
