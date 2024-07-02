import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/responses/loginResponse.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = `${environment.apiUrl}/auths`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(loginModel: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, loginModel)
      .pipe(
        tap(res => {
          localStorage.setItem("token", res.token || "");
        })
      );
  }

  googleLogin(token: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/google`, { token })
    .pipe(
      tap(res => {
        localStorage.removeItem("email");
        localStorage.setItem("token", res.token || "");
      })
    );
  }

  validateToken() {
    const token = localStorage.getItem("token") || "";
    return this.http.get(`${this.url}/tokenValidate`, {
      headers: {
        "x-token": token
      }
    }).pipe(
      map(res =>  true),
      catchError(err => of(false))
    );
  }

  logOut() {
    localStorage.removeItem("token");
    google.accounts.id.revoke("L19330658@hermosillo.tecnm.mx", () => {
      this.router.navigateByUrl("/login");
    });
  }
}
