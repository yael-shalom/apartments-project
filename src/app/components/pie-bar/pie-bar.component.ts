import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ApartmentsService } from '../../shared/services/apartments.service';

@Component({
  selector: 'app-pie-bar',
  imports: [ChartModule],
  templateUrl: './pie-bar.component.html',
  styleUrl: './pie-bar.component.css'
})
export class PieBarComponent {

  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  apartmentsList$ = inject(ApartmentsService).list$;

  labels: string[] = [];

  amount: any;

  constructor() {
    this.apartmentsList$.subscribe(lst => {
      this.labels = [...new Set(lst.map(apartment => apartment.year.toString()))].sort((a, b) => a.localeCompare(b));

      this.amount = lst.reduce((dict: any, current) => {
        if (!dict[current.year]) {
          dict[current.year] = 0;
        }
        dict[current.year]++;
        return dict;
      }, {});

      this.initChart();
    });
  }

  themeEffect = effect(() => {
  });

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      // Generate a unique color for each label
      const baseColors = [
        '--p-cyan-500',
        '--p-orange-500',
        '--p-gray-500',
        '--p-blue-500',
        '--p-green-500',
        '--p-yellow-500',
        '--p-purple-500',
        '--p-pink-500',
        '--p-teal-500',
        '--p-red-500'
      ];
      const baseHoverColors = [
        '--p-cyan-400',
        '--p-orange-400',
        '--p-gray-400',
        '--p-blue-400',
        '--p-green-400',
        '--p-yellow-400',
        '--p-purple-400',
        '--p-pink-400',
        '--p-teal-400',
        '--p-red-400'
      ];

      const backgroundColor = this.labels.map((_, i) =>
        documentStyle.getPropertyValue(baseColors[i % baseColors.length])
      );
      const hoverBackgroundColor = this.labels.map((_, i) =>
        documentStyle.getPropertyValue(baseHoverColors[i % baseHoverColors.length])
      );

      this.data = {
        labels: this.labels,
        datasets: [
          {
            data: Object.values(this.amount),
            backgroundColor,
            hoverBackgroundColor
          }
        ]
      };
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    }

  }
}