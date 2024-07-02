import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {

  registerForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      terms: [false, Validators.required],
    }, {
      validators: this.validators.checkPasswordsValidator()
    });
  }

  createUser() {
    this.formSubmitted = true;
    if(this.registerForm.invalid) {
      return;
    }

    const user = new UserModel(
      this.registerForm.get("name")?.value,
      this.registerForm.get("email")?.value,
      this.registerForm.get("password")?.value
    );

    this.userService.createUser(user).subscribe(res => {
      this.router.navigateByUrl("/pages/dashboard");
    }, err => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: err.error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  notValidFields(field: string) {
    return this.registerForm.get(field)?.invalid && this.formSubmitted;
  }

  checkTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  checkPasswords() {
    return !(this.registerForm.get('password')?.value === this.registerForm.get('passwordConfirm')?.value) && this.formSubmitted;
  }

  validators = {
    checkPasswordsValidator() {
      return(formGroup: FormGroup) => {
        const password = formGroup.get("password");
        const passwordConfirm = formGroup.get("passwordConfirm");

        if(password?.value === passwordConfirm?.value) {
          passwordConfirm?.setErrors(null);
        }else {
          passwordConfirm?.setErrors({notEqual: true});
        }
      }
    },

  }
}
