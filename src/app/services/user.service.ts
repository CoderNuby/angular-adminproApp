import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { UserResponse } from '../models/responses/userResponse.model';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersResponse } from '../models/responses/usersResponse.model';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RootService {

  readonly url = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    super();
   }

  getUser(currentPage: number = 0, recordsPerPage: number = 5) {
    return this.http.get<UsersResponse>(this.url, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const users = resp.users?.map(user => {
          return new UserModel(
            user?.name,
            user?.email,
            "",
            user?.image,
            user?.google,
            user?.role,
            user?._id,
          );
        })

        resp.users = users;
        return resp;
      })
    );
  }

  getAdminUsers(currentPage: number = 0, recordsPerPage: number = 5) {
    return this.http.get<UsersResponse>(`${this.url}/admins`, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const users = resp.users?.map(user => {
          return new UserModel(
            user?.name || "",
            user?.email || "",
            "",
            user?.image || "",
            user?.google || false,
            user?.role || "USER_ROLE",
            user?._id || "",
          );
        });

        resp.users = users;
        return resp;
      })
    );
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
      headers: this.headers
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.headers
    });
  }

  changeToAdminRole(id: string) {
    return this.http.put(`${this.url}/role/${id}`, {}, {
      headers: this.headers
    });
  }
}
