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

  manuItems: Menu[] = [];
  user!: UserModel;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ){
    this.manuItems = this.sidebarService.menu;
  }

  ngOnInit(): void {
    this.user = this.authService.user;
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
