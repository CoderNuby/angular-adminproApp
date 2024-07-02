import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { UserResponse } from '../models/responses/userResponse.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly url = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: UserModel): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.url, user).pipe(
      tap(res => {
        localStorage.setItem("token", res.token || "");
      })
    );
  }
}
