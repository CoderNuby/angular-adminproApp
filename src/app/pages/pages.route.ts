import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphsComponent } from './graphs/graphs.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  { 
    path: 'pages',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'graphs', component: GraphsComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
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
