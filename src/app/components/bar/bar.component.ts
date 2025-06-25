import { map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ApartmentsService } from '../../shared/services/apartments.service';

@Component({
  selector: 'app-bar',
  imports: [ChartModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})

export class BarComponent implements OnInit {

  basicData: any;

  basicOptions: any;

  platformId = inject(PLATFORM_ID);

  apartmentsList$ = inject(ApartmentsService).list$;

  labels: any;

  amount: any;

  count: any;

  constructor() {
    this.apartmentsList$.subscribe(lst => {
      this.labels = [...new Set(lst.map(apartment => apartment.year))].sort((a, b) => a - b);

      this.count = {}; // Initialize count as an empty object
      this.amount = lst.reduce((dict: any, current) => {
        if (!dict[current.year]) {
          this.count[current.year] = 0;
          dict[current.year] = 0;
        }
        dict[current.year] += current['average price (NIS) 4+ rooms apartments'] || 0;
        this.count[current.year]++;
        return dict;
      }, {});
      this.labels.map((x: number) => this.amount[x] = this.amount[x] / this.count[x]);
      this.initChart();
    });
  }

  themeEffect = effect(() => {
    // if (this.configService.transitionComplete()) {
    //     if (this.designerService.preset()) {
    //         this.initChart();
    //     }
    // }
  });

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicData = {
        labels: this.labels,
        datasets: [
          {
            label: 'average price (NIS) 4+ rooms apartments',
            data: Object.values(this.amount),
            backgroundColor: [
              'rgba(249, 115, 22, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgb(107, 114, 128, 0.2)',
              'rgba(139, 92, 246, 0.2)',
            ],
            borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }
}