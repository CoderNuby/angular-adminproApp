import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { MedicalDoctorModel } from '../../../models/medicalDoctor.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MedicalDoctorService } from '../../../services/medical-doctor.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { AuthService } from '../../../services/auth.service';
import { HospitalModel } from '../../../models/hospital.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit, OnDestroy {

  currentUser!: UserModel;

  doctors: MedicalDoctorModel[] = [];

  totalRecords: number = 0;
  showPaginator: boolean = true;
  recordsPerPage: number = 10;
  loading: boolean = false;
  currentPage: number = 0;
  keyWord: string = "";

  imageSubscription!: Subscription;

  constructor(
    private medicalDoctorService: MedicalDoctorService,
    private searchService: SearchService,
    private modalImageService: ModalImageService,
    private authService: AuthService,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.loadDoctors(0);
    this.imageSubscription = this.modalImageService.imageChanged.subscribe(data => {
      this.doctors = this.doctors.map(doctor => {
        if(doctor._id === data.id) {
          doctor = new MedicalDoctorModel(
            doctor.name,
            data.image,
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
        }
        return doctor;
      });
    });
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  createDoctor() {
    this.router.navigate(['/pages/doctor-maintenance'], { queryParams: { id: "new-doctor" } });
  }

  editDoctor(doctor: MedicalDoctorModel) {
    this.router.navigate(['/pages/doctor-maintenance'], { queryParams: { id: doctor._id } });
  }

  changeImage(doctor: MedicalDoctorModel) {
    if(this.currentUser.role === "USER_ROLE") {
      return;
    }
    this.modalImageService.openModal("medicalDoctors", doctor._id || "", doctor.image);
  }
  
  async searchDoctors(keyWord: string) {
    this.keyWord = keyWord;
    this.showPaginator = false;
    await this.loadDoctors(0);
    this.showPaginator = true;
  }

  loadDoctors(page: number) {
    this.loading = true;
    this.currentPage = page;

    if(!this.keyWord) {
      this.medicalDoctorService.getDoctors(this.currentPage, this.recordsPerPage).subscribe(res => {
        this.doctors = res.medicalDoctors || [];
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.doctors = [];
        this.totalRecords = 0;
        this.loading = false;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Get Hospitals",
          text: err.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
    }else {
      this.searchService.searchDoctorCollection(this.keyWord, this.currentPage, this.recordsPerPage).subscribe(res => {
        this.doctors = res.data;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.doctors = [];
        this.totalRecords = 0;
        this.loading = false;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Get User",
          text: err.error.message,
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
  }

  deleteDoctor(doctor: MedicalDoctorModel) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicalDoctorService.deleteDoctor(doctor._id || "").subscribe(res => {
          this.doctors = this.doctors.filter(x => x._id !== doctor._id);
          this.totalRecords--;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Doctor",
            text: "Doctor deleted successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Delete Doctor",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  changePage(page: number) {
    this.loadDoctors(page)
  }

  showAdminFields() {
    return this.currentUser.role === "ADMIN_ROLE";
  }
}
