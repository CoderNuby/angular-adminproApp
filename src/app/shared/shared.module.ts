import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';



@NgModule({
  declarations: [
    BreadCrumbsComponent,
    SideBarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadCrumbsComponent,
    SideBarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
