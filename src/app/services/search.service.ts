import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RootService } from './root.service';
import { SearchResponse } from '../models/responses/searchResponse.model';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends RootService {

  url: string = `${environment.apiUrl}/searches/collections`;

  constructor(
    private http: HttpClient
  ) {
    super();
   }

  searchUserCollection(keyWord: string, currentPage: number = 0, recordsPerPage: number = 5): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.url}/users/${keyWord}`, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const users = resp.data.map(user => {
          return new UserModel(
            user?.name || "",
            user?.email || "",
            "",
            user?.image || "",
            user?.google || false,
            user?.role || "USER_ROLE",
            user?._id || "",
          );
        })

        resp.data = users;
        return resp;
      })
    );
  }
}
