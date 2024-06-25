import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';




@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit {

  fruits: any[] = [];

  ngOnInit(): void {
    this.fruits = [
      { name: "Apples", quantity: 44 },
      { name: "Oranges", quantity: 55 },
      { name: "Bananas", quantity: 67 },
      { name: "Berries", quantity: 83 },
      { name: "Mango", quantity: 100 },
    ];
  }
}