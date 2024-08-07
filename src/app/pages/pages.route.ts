import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  { 
    path: 'pages',
    component: PagesComponent,
    canActivate: [authGuard],
    loadChildren: () => import("./child-routes.module").then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
