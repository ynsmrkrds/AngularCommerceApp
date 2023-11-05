import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {RegisterRequestModel} from 'src/app/models/register-request-model';
import {UserService} from 'src/app/services/user.service';
import {passwordMatchValidator} from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: passwordMatchValidator
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  get name() {
    return this.registerForm.controls['name'];
  }

  get surname() {
    return this.registerForm.controls['surname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  register() {
    let model = new RegisterRequestModel(
      this.name.value!,
      this.surname.value!,
      this.email.value!,
      this.password.value!);

    this.userService.register(model).subscribe({
      next: (v) => {
        if (v.response != null) {
          this.messageService.add({
            severity: v.response!.isSuccessful ? "success" : "warn",
            detail: v.response!.message
          });

          if (v.response!.isSuccessful) {
            this.router.navigate(["login"]);
          }
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
