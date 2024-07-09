import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RootService } from './root.service';
import { HospitalsResponse } from '../models/responses/hospitalsResponse.model';
import { map, Observable } from 'rxjs';
import { HospitalModel } from '../models/hospital.model';
import { UserModel } from '../models/user.model';
import { HospitalResponse } from '../models/responses/hospitaResponse.model';

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

  getHospital(id: string): Observable<HospitalResponse> {
    return this.http.get<HospitalResponse>(`${this.url}/${id}`, {
      headers: this.headers,
    }).pipe(
      map(resp => {
        resp.hospital = new HospitalModel(
            resp.hospital!.name,
            resp.hospital?.image,
            new UserModel(
              resp.hospital!.user!.name,
              resp.hospital!.user!.email,
              "",
              resp.hospital!.user?.image,
              resp.hospital!.user?.google,
              resp.hospital!.user?.role,
              resp.hospital!.user?._id
            ),
            resp.hospital!._id
          );

        return resp;
      })
    );
  }

  getAllHospitalNames() {
    return this.http.get<HospitalsResponse>(`${this.url}/all/names`, {
      headers: this.headers
    }).pipe(
      map(resp => {
        const hospitals = resp.hospitals?.map(hospital => {
          return new HospitalModel(
            hospital.name,
            hospital.image,
            new UserModel("", ""),
            hospital._id
          );
        })

        resp.hospitals = hospitals;
        return resp;
      })
    );
  }

  createHospital(name: string) {
    return this.http.post(this.url, {name},  {
      headers: this.headers
    });
  }

  updateHospital(id: string, name: string) {
    return this.http.put(`${this.url}/${id}`, {name},  {
      headers: this.headers
    });
  }

  deleteHospital(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.headers
    });
  }
}
