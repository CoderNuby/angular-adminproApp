import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementDecrementComponent } from './increment-decrement/increment-decrement.component';
import { FormsModule } from '@angular/forms';
import { MultipleRadialBarComponent } from './multiple-radial-bar/multiple-radial-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
  declarations: [
    IncrementDecrementComponent,
    MultipleRadialBarComponent,
    PaginatorComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports: [
    IncrementDecrementComponent,
    MultipleRadialBarComponent,
    PaginatorComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
