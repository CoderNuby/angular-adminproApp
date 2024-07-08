import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { SearchService } from '../../../services/search.service';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

  users: UserModel[] = [];

  currentPage: number = 0;
  totalRecords: number = 0;
  recordsPerPage: number = 10;
  
  loading: boolean = false;
  keyWord: string = "";

  showPaginator: boolean = true;

  currentUser!: UserModel;

  imageSubscription!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private authService: AuthService,
    private modalImageService: ModalImageService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.loadUsers(0);
    this.imageSubscription = this.modalImageService.imageChanged.subscribe(data => {
      this.users = this.users.map(user => {
        if(user._id === data.id) {
          user = new UserModel(
            user.name,
            user.email,
            "",
            data.image,
            user.google,
            user.role,
            user._id
          );
        }
        return user;
      });
    });
  }

  ngOnDestroy(): void {
    this.imageSubscription.unsubscribe();
  }

  changeImage(user: UserModel) {
    if(this.currentUser.role === "USER_ROLE") {
      return;
    }
    if(user.google) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Chage Image",
        text: "You can not change google user's image",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.modalImageService.openModal("users", user._id || "", user.image);
  }

  changeRole(user: UserModel) {

    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to set this user to Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changeToAdminRole(user._id || '').subscribe(res => {
          this.users = this.users.filter(x => x._id !== user._id);
          this.totalRecords--;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User",
            text: "User updated successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Update User",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  deleteUser(user: UserModel) {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user._id || "").subscribe(res => {
          this.users = this.users.filter(x => x._id !== user._id);
          this.totalRecords--;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User",
            text: "User deleted successful",
            showConfirmButton: false,
            timer: 1500
          });
        }, err => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Delete User",
            text: err.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }

  async searchUsers(keyWord: string) {
    this.keyWord = keyWord;
    if(!this.keyWord) {
      this.showPaginator = false;
      await this.loadUsers(0);
      this.showPaginator = true;
    }else{
      this.showPaginator = false;
      await this.loadUsers(0);
      this.showPaginator = true;
    }
  }

  changePage(page: number) {
    this.loadUsers(page);
  }

  loadUsers(page: number) {
    this.loading = true;
    this.currentPage = page;

    if(!this.keyWord) {
      this.userService.getUser(this.currentPage, this.recordsPerPage).subscribe(res => {
        this.users = res.users || [];
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.users = [];
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
    }else {
      this.searchService.searchUserCollection(this.keyWord, this.currentPage, this.recordsPerPage).subscribe(res => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
        this.loading = false;
      }, err => {
        this.users = [];
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

  showAdminFields() {
    return this.currentUser.role === "ADMIN_ROLE";
  }
}
