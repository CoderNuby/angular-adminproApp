import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RootService } from './root.service';
import { HospitalsResponse } from '../models/responses/hospitalsResponse.model';
import { map } from 'rxjs';
import { HospitalModel } from '../models/hospital.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends RootService {

  readonly url = `${environment.apiUrl}/hospitals`;

  constructor(
    private http: HttpClient
  ) {
    super();
   }

  getHospitals(currentPage: number = 0, recordsPerPage: number = 5) {
    return this.http.get<HospitalsResponse>(this.url, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const hospitals = resp.hospitals?.map(hospital => {
          return new HospitalModel(
            hospital.name,
            hospital.image,
            hospital.user = new UserModel(
              hospital.user!.name,
              hospital.user!.email,
              "",
              hospital.user?.image,
              hospital.user?.google,
              hospital.user?.role,
              hospital.user?._id
            ),
            hospital._id
          );
        })

        resp.hospitals = hospitals;
        return resp;
      })
    );
  }

  deleteHospital(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.headers
    });
  }
}
