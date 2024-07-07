import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { SearchService } from '../../../../services/search.service';
import { AuthService } from '../../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent implements OnInit {

  adminUsers: UserModel[] = [];

  currentPage: number = 0;
  totalRecords: number = 0;
  recordsPerPage: number = 10;
  
  loading: boolean = false;
  keyWord: string = "";

  showPaginator: boolean = true;

  currentUser!: UserModel;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.loadUsers(0);
  }

  changePage(page: number) {
    this.loadUsers(page);
  }

  loadUsers(page: number) {
    this.loading = true;
    this.currentPage = page;
    this.userService.getAdminUsers(this.currentPage, this.recordsPerPage).subscribe(res => {
      this.adminUsers = res.users || [];
      this.totalRecords = res.totalRecords;
      this.loading = false;
    }, err => {
      this.adminUsers = [];
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
