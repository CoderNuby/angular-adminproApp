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

const routes: Routes = [
  { 
    path: 'pages',
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: "Dashboard"}},
      { path: 'dashboard', component: DashboardComponent, data: { title: "Dashboard"}},
      { path: 'progress', component: ProgressComponent, data: { title: "Progress"}},
      { path: 'graphs', component: GraphsComponent, data: { title: "Graphs"}},
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: "Account Settings"}},
      { path: 'promises', component: PromisesComponent, data: { title: "Promises"}},
      { path: 'rxjs', component: RxjsComponent, data: { title: "Rxjs"}},
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
