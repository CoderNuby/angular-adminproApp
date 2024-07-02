import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  loginForm!: FormGroup;
  @ViewChild("btnGoogle") btnGoogle!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){
    const email = localStorage.getItem("email") || "";
    let rememberEmail = false;
    if(email) {
      rememberEmail = true;
    }
    this.loginForm = this.formBuilder.group({
      email: [email, [Validators.required, Validators.email]],
      password: ["", Validators.required],
      remember: [rememberEmail]
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.GOOGLE_ID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.btnGoogle.nativeElement,
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    this.authService.googleLogin(token).subscribe(res => {
      this.router.navigateByUrl("/pages/dashboard");
    });
  }
  
  loginUser() {
    if(this.loginForm.invalid) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Credentials",
        text: "Incorrect Credentials",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const loginInfo: LoginModel = {
      email: this.loginForm.get("email")?.value,
      password: this.loginForm.get("password")?.value,
    };

    this.authService.login(loginInfo).subscribe(res => {
      if(this.loginForm.get("remember")?.value){
        localStorage.setItem("email", loginInfo.email);
      }else {
        localStorage.removeItem("email");
      }
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
}
