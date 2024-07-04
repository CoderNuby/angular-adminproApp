import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { UserResponse } from '../models/responses/userResponse.model';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  createUser(user: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url, user).pipe(
      tap(res => {
        localStorage.setItem("token", res.token || "");
      })
    );
  }

  updateProfile(user: UserModel) {
    return this.http.put<UserResponse>(`${this.url}/${user._id}`, user, {
      headers: {
        "x-token": this.token
      }
    });
  }
}
