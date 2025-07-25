import { Component, ChangeDetectionStrategy, inject, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ApartmentFields } from '../../shared/models/apartment-fields';
import { ApartmentsService } from '../../shared/services/apartments.service';

@Component({
  selector: 'app-line-graph',
  imports: [CommonModule, FormsModule, ChartModule],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineGraphComponent implements OnChanges {
  apartmentsList$ = inject(ApartmentsService).list$;
  fields = Object.keys(ApartmentFields).filter(f => f !== '_id');
  fieldLabels = ApartmentFields;
  @Input() selectedX: keyof typeof ApartmentFields | '' = '';
  @Input() selectedY: keyof typeof ApartmentFields | '' = '';
  data: any;
  options: any;
  private lastList: any[] = [];

  constructor() {
    this.apartmentsList$.subscribe(lst => {
      this.lastList = lst;
      this.updateChartData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedX'] || changes['selectedY']) {
      this.updateChartData();
    }
  }

  getFieldLabel(field: string): string {
    return this.fieldLabels[field as keyof typeof ApartmentFields] ?? field;
  }

  onFieldChange() {
    this.updateChartData();
  }

  updateChartData() {
    if (!this.selectedX) {
      this.selectedX = 'year';
    }
    console.log('[LineGraph] selectedX:', this.selectedX, 'selectedY:', this.selectedY);
    if (!this.lastList || !this.selectedX || !this.selectedY) {
      console.log('[LineGraph] No data: lastList:', this.lastList, 'selectedX:', this.selectedX, 'selectedY:', this.selectedY);
      this.data = undefined;
      return;
    }
    // Sort by X axis
    const sorted = [...this.lastList].sort((a, b) => {
      const aVal = a[this.selectedX];
      const bVal = b[this.selectedX];
      return String(aVal).localeCompare(String(bVal), undefined, {numeric: true});
    });
    const labels = sorted.map(apartment => String(apartment[this.selectedX]));
    const values = sorted.map(apartment => Number(apartment[this.selectedY]));
    console.log('[LineGraph] labels:', labels, 'values:', values);
    this.data = {
      labels,
      datasets: [
        {
          label: this.getFieldLabel(this.selectedY),
          data: values,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        }
      ]
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#333'
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: this.getFieldLabel(this.selectedX)
          }
        },
        y: {
          title: {
            display: true,
            text: this.getFieldLabel(this.selectedY)
          }
        }
      }
    };
    console.log('[LineGraph] chartData:', this.data);
  }
}
