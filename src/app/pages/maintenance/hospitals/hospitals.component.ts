import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { HospitalModel } from '../../../models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.css'
})
export class HospitalsComponent implements OnInit, OnDestroy {

  currentUser!: UserModel;

  hospitals: HospitalModel[] = [];

  totalRecords: number = 0;
  showPaginator: boolean = true;
  recordsPerPage: number = 10;
  loading: boolean = false;
  currentPage: number = 0;
  keyWord: string = "";

  imageSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private hospitalService: HospitalService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.loadHospitals(0);
    this.imageSubscription = this.modalImageService.imageChanged.subscribe(data => {
      this.hospitals = this.hospitals.map(hospital => {
        if(hospital._id === data.id) {
          hospital = new HospitalModel(
            hospital.name,
            data.image,
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
        }
        return hospital;
      });
    });
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  createHospital() {
    Swal.fire({
      title: "Hospital Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Create Hospital",
      showLoaderOnConfirm: true,
      preConfirm: async (name) => {
        try {
          if (!name) {
            return Swal.showValidationMessage("name is require");
          }

          return name;
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.createHospital(result.value).subscribe(res => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Hospital",
            text: "Hospital created successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Create Hospital",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  editHospital(hospital: HospitalModel) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to edit this hospital?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.updateHospital(hospital._id || "", hospital.name).subscribe(res => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Hospital",
            text: "Hospital updated successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Update Hospital",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  changeImage(hospital: HospitalModel) {
    if(this.currentUser.role === "USER_ROLE") {
      return;
    }
    this.modalImageService.openModal("hospitals", hospital._id || "", hospital.image);
  }

  async searchHospitals(keyWord: string) {
    this.keyWord = keyWord;
    this.showPaginator = false;
    await this.loadHospitals(0);
    this.showPaginator = true;
  }

  loadHospitals(page: number) {
    this.loading = true;
    this.currentPage = page;
    if(!this.keyWord) {
      this.hospitalService.getHospitals(this.currentPage, this.recordsPerPage).subscribe(res => {
        this.hospitals = res.hospitals || [];
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.hospitals = [];
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
      this.searchService.searchHospitalCollection(this.keyWord, this.currentPage, this.recordsPerPage).subscribe(res => {
        this.hospitals = res.data;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.hospitals = [];
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

  changePage(page: number) {
    this.loadHospitals(page)
  }


  deleteHospital(hospital: HospitalModel) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this hospital?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital._id || "").subscribe(res => {
          this.hospitals = this.hospitals.filter(x => x._id !== hospital._id);
          this.totalRecords--;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Hospital",
            text: "Hospital deleted successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Delete Hospital",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  showAdminFields() {
    return this.currentUser.role === "ADMIN_ROLE";
  }
}
