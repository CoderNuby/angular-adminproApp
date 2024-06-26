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
        { title: "Dashboard", url: "/"},
        { title: "Progress", url: "/pages/progress"},
        { title: "Graphs", url: "/pages/graphs"}
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