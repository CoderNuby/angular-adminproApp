import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent implements OnInit {

  menuItems: Menu[] = [];
  user!: UserModel;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ){
  }
  
  ngOnInit(): void {
    this.user = this.authService.user;
    this.menuItems = this.sidebarService.menu;
  }

  logOut() {
    this.authService.logOut();
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
