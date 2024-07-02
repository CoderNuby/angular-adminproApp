import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

  manuItems: Menu[] = []; 

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ){
    this.manuItems = sidebarService.menu;
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
