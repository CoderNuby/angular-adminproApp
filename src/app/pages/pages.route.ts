import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { AdminsComponent } from './maintenance/users/admins/admins.component';

const routes: Routes = [
  { 
    path: 'pages',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: "Dashboard"}},
      { path: 'dashboard', component: DashboardComponent, data: { title: "Dashboard"}},
      { path: 'profile', component: ProfileComponent, data: { title: "Profile"}},
      { path: 'progress', component: ProgressComponent, data: { title: "Progress"}},
      { path: 'graphs', component: GraphsComponent, data: { title: "Graphs"}},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: "Account Settings"}},
      { path: 'promises', component: PromisesComponent, data: { title: "Promises"}},
      { path: 'rxjs', component: RxjsComponent, data: { title: "Rxjs"}},
      { path: 'users', component: UsersComponent, data: { title: "Users"}},
      { path: 'doctors', component: DoctorsComponent, data: { title: "Doctors"}},
      { path: 'hospitals', component: HospitalsComponent, data: { title: "Hospitals"}},
      { path: 'admins', component: AdminsComponent, data: { title: "Admins"}},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
