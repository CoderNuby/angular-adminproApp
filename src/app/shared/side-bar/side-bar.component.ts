import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

  manuItems: Menu[] = []; 

  constructor(
    private sidebarService: SidebarService
  ){
    this.manuItems = sidebarService.menu;
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
