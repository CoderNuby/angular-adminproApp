import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-multiple-radial-bar',
  templateUrl: './multiple-radial-bar.component.html',
  styleUrl: './multiple-radial-bar.component.css'
})
export class MultipleRadialBarComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;

  @Input() data: CharData[] = [];
  @Input() title: string = "";

  
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    const totalQuantity = this.data.reduce((sum, item) => sum + item.quantity, 0);
    this.chartOptions = {
      series: this.data.map(x => x.quantity),
      chart: {
        height: 350,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: this.title,
              formatter: function(w) {
                return totalQuantity.toString();
              }
            }
          }
        }
      },
      labels: this.data.map(x => x.name)
    };
  }
}

interface CharData {
  name: string;
  quantity: number;
}
