import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementDecrementComponent } from './increment-decrement/increment-decrement.component';
import { FormsModule } from '@angular/forms';
import { MultipleRadialBarComponent } from './multiple-radial-bar/multiple-radial-bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    IncrementDecrementComponent,
    MultipleRadialBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule
  ],
  exports: [
    IncrementDecrementComponent,
    MultipleRadialBarComponent
  ]
})
export class ComponentsModule { }
