import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RootService } from './root.service';
import { SearchResponse } from '../models/responses/searchResponse.model';
import { Observable, map } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HospitalModel } from '../models/hospital.model';
import { MedicalDoctorModel } from '../models/medicalDoctor.model';

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

   searchDoctorCollection(keyWord: string, currentPage: number = 0, recordsPerPage: number = 5): Observable<SearchResponse<MedicalDoctorModel>> {
    return this.http.get<SearchResponse<MedicalDoctorModel>>(`${this.url}/medicalDoctors/${keyWord}`, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const doctors = resp.data?.map(doctor => {
          return new MedicalDoctorModel(
            doctor.name,
            doctor.image,
            new UserModel(
              doctor.user!.name,
              doctor.user!.email,
              "",
              doctor.user?.image,
              doctor.user?.google,
              doctor.user?.role,
              doctor.user?._id,
            ),
            new HospitalModel(
              doctor.hospital!.name,
              doctor.hospital?.image,
              new UserModel("", ""),
              doctor.hospital?._id
            ),
            doctor._id
          );
        });

        resp.data = doctors;
        return resp;
      })
    );
  }

  searchHospitalCollection(keyWord: string, currentPage: number = 0, recordsPerPage: number = 5): Observable<SearchResponse<HospitalModel>> {
    return this.http.get<SearchResponse<HospitalModel>>(`${this.url}/hospitals/${keyWord}`, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const hospitals = resp.data?.map(hospital => {
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
            )
          );
        })

        resp.data = hospitals;
        return resp;
      })
    );
  }

  searchUserCollection(keyWord: string, currentPage: number = 0, recordsPerPage: number = 5): Observable<SearchResponse<UserModel>> {
    return this.http.get<SearchResponse<UserModel>>(`${this.url}/users/${keyWord}`, {
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
