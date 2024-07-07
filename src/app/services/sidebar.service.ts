import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    // { 
    //   title:  "Main",
    //   icon: "mdi mdi-gauge",
    //   submenu: [
    //     { title: "Dashboard", url: "/pages/dashboard"},
    //     { title: "Progress", url: "/pages/progress"},
    //     { title: "Graphs", url: "/pages/graphs"},
    //     { title: "Promises", url: "/pages/promises"},
    //     { title: "Rxjs", url: "/pages/rxjs"}
    //   ] 
    // },
    { 
      title:  "Maintenance",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        { title: "Users", url: "/pages/users"},
        { title: "Doctors", url: "/pages/doctors"},
        { title: "Hospitals", url: "/pages/hospitals"},
        { title: "Admins", url: "/pages/admins"},
      ] 
    }
  ];

  constructor() {
  }
}

interface Menu {
  title: string;
  icon: string;
  submenu: SubMenu[];
}

interface SubMenu{
  title: string;
  url: string;
}