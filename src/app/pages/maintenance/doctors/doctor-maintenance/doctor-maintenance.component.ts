import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalModel } from '../../../../models/hospital.model';
import { HospitalService } from '../../../../services/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalDoctorModel } from '../../../../models/medicalDoctor.model';
import { MedicalDoctorService } from '../../../../services/medical-doctor.service';
import { UserModel } from '../../../../models/user.model';
import { Subscription } from 'rxjs';
import { UpdateMedicalDoctorModel } from '../../../../models/updateMedicalDoctor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-maintenance',
  templateUrl: './doctor-maintenance.component.html',
  styleUrl: './doctor-maintenance.component.css'
})
export class DoctorMaintenanceComponent implements OnInit, OnDestroy {

  doctorForm!: FormGroup;
  title: string = "Edit Doctor";
  hospitals: HospitalModel[] = [];
  doctorId: string = "";
  hospitalSelected!: HospitalModel;

  doctor!: MedicalDoctorModel;

  isNewDoctor: boolean = false;

  queryParamsSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private route: ActivatedRoute,
    private medicalDoctorService: MedicalDoctorService,
    private router: Router
  ) {

  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  ngOnInit(): void { 
    this.doctorForm = this.formBuilder.group({
      name: ["", Validators.required],
      hospitalId: ["", Validators.required]
    });

    this.hospitalService.getAllHospitalNames().subscribe(res => {
      this.hospitals = res.hospitals || [];
      this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
        this.doctorId = params['id'];
        if(this.doctorId === "new-doctor") {
          this.isNewDoctor = true;
          this.title = "New Doctor";
          this.doctor = new MedicalDoctorModel(
            "",
            "",
            new UserModel(
              "",
              ""
            ),
            new HospitalModel(
              ""
            )
          );
          this.hospitalSelected = new HospitalModel(
            this.doctor.hospital?.name!,
            this.doctor.hospital?.image,
            new UserModel(
              "",
              ""
            ),
            this.doctor.hospital?._id
          );
        }else{
          this.medicalDoctorService.getDoctor(this.doctorId).subscribe(res => {
            this.doctor = res.medicalDoctor!;
            this.hospitalSelected = new HospitalModel(
              this.doctor.hospital?.name!,
              this.doctor.hospital?.image,
              new UserModel(
                "",
                ""
              ),
              this.doctor.hospital?._id
            );
  
            this.doctorForm.patchValue({
              name: this.doctor.name,
              hospitalId: this.doctor.hospital?._id
            });
          });
        }
      });
    });


    this.doctorForm.get("hospitalId")!.valueChanges.subscribe(hospitalId => {
      if(hospitalId) {
        this.hospitalService.getHospital(hospitalId).subscribe(res => {
          this.hospitalSelected = res.hospital!;
        });
      }
    });
  }

  saveDoctor() {
    if(this.isNewDoctor) {
      const doctorName = this.doctorForm.get("name")?.value;
      this.medicalDoctorService.createDoctor(doctorName, this.hospitalSelected._id!).subscribe(res => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Create Doctor",
          text: "Doctor created successful",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl("/pages/doctors");
      });
    }else {
      if(this.doctorForm.valid){
        const doctorToUpdate = new UpdateMedicalDoctorModel(
          this.doctorId,
          this.doctorForm.get("name")?.value,
          this.hospitalSelected._id!
        );
  
        this.medicalDoctorService.updateDoctor(doctorToUpdate).subscribe(res => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update Doctor",
            text: "Doctor updated successful",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl("/pages/doctors");
        });
      }
    }
  }
}
