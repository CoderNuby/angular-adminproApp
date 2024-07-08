import { Injectable } from '@angular/core';
import { RootService } from './root.service';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MedicalDoctorsResponse } from '../models/responses/medicalDoctorsResponse.model';
import { map, Observable } from 'rxjs';
import { MedicalDoctorModel } from '../models/medicalDoctor.model';
import { UserModel } from '../models/user.model';
import { HospitalModel } from '../models/hospital.model';
import { MedicalDoctorResponse } from '../models/responses/medicalDoctorResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MedicalDoctorService extends RootService{

  readonly url = `${environment.apiUrl}/medicalDoctors`;

  constructor(
    private http: HttpClient
  ) {
    super();
   }

  getDoctors(currentPage: number = 0, recordsPerPage: number = 5): Observable<MedicalDoctorsResponse> {
    return this.http.get<MedicalDoctorsResponse>(this.url, {
      headers: this.headers,
      params: {
        currentPage,
        recordsPerPage
      }
    }).pipe(
      map(resp => {
        const doctors = resp.medicalDoctors?.map(doctor => {
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

        resp.medicalDoctors = doctors;
        return resp;
      })
    );
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.headers
    });
  }
}
