import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    { 
      title:  "Main",
      icon: "nav-small-cap",
      submenu: [
        { title: "Dashboard", url: "/pages/dashboard"},
        { title: "Progress", url: "/pages/progress"},
        { title: "Graphs", url: "/pages/graphs"},
        { title: "Promises", url: "/pages/promises"},
        { title: "Rxjs", url: "/pages/rxjs"}
      ] 
    }
  ];

  constructor() { }
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