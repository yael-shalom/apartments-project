import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApartmentFields } from '../../shared/models/apartment-fields';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ApartmentsService } from '../../shared/services/apartments.service';
import { Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pie-bar',
  imports: [CommonModule, FormsModule, ChartModule],
  templateUrl: './pie-bar.component.html',
  styleUrl: './pie-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieBarComponent implements OnChanges {
  getFieldLabel(field: string): string {
    return this.fieldLabels[field as keyof typeof ApartmentFields] ?? field;
  }
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  apartmentsList$ = inject(ApartmentsService).list$;
  fields = Object.keys(ApartmentFields).filter(f => f !== '_id');
  fieldLabels = ApartmentFields;
  @Input() selectedField: keyof typeof ApartmentFields | '' = 'year';
  labels: string[] = [];
  amount: any;
  private lastList: any[] = [];
  constructor(private cdr: ChangeDetectorRef) {
    this.apartmentsList$.subscribe(lst => {
      this.lastList = lst;
      this.updateChartData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedField'] && this.lastList) {
      this.updateChartData();
      this.cdr.detectChanges();
    }
  }

  onFieldChange() {
    this.updateChartData();
  }

  updateChartData() {
    if (!this.lastList || !this.selectedField) {
      this.data = undefined;
      this.labels = [];
      this.amount = undefined;
      this.options = undefined;
      return;
    }
    // קיבוץ לפי המאפיין הנבחר
    this.labels = [...new Set(this.lastList.map(apartment => String(apartment[this.selectedField])))]
      .sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
    this.amount = this.lastList.reduce((dict: any, current) => {
      const key = String(current[this.selectedField]);
      if (!dict[key]) dict[key] = 0;
      dict[key]++;
      return dict;
    }, {});
    this.initChart();
  }

  themeEffect = effect(() => {
  });

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      // Generate a unique color for each label
      const baseColors = [
        '--p-cyan-300',
        '--p-orange-300',
        '--p-gray-300',
        '--p-blue-300',
        '--p-green-300',
        '--p-yellow-300',
        '--p-purple-300',
        '--p-pink-300',
        '--p-teal-300',
        '--p-red-300'
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