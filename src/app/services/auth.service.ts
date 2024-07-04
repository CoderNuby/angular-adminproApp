import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { LoginResponse } from '../models/responses/loginResponse.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = `${environment.apiUrl}/auths`;

  public user!: UserModel;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token() {
    return localStorage.getItem("token") || "";
  }

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
    return this.http.get<LoginResponse>(`${this.url}/tokenValidate`, {
      headers: {
        "x-token": this.token
      }
    }).pipe(
      map(res =>  {
        this.user = new UserModel(
          res.user?.name || "",
          res.user?.email || "",
          "",
          res.user?.image || "",
          res.user?.google || false,
          res.user?.role || "USER_ROLE",
          res.user?._id || "",
        );
        return true;
      }),
      catchError(err => of(false))
    );
  }

  logOut() {
    localStorage.removeItem("token");
    if(this.user.google) {
      google.accounts.id.revoke(this.user.email, () => {
        this.router.navigateByUrl("/login");
      });
    }else {
      this.router.navigateByUrl("/login");
    }
  }
}
