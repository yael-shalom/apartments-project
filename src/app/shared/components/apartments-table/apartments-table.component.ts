import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { ApartmentsService } from '../../services/apartments.service';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Apartment } from '../../models/apartment';
import { ApartmentFields } from '../../../models/apartment-fields';

@Component({
  selector: 'app-apartments-table',
  imports: [CommonModule, TableModule, InputTextModule, TagModule,
    SelectModule, MultiSelectModule, ButtonModule, IconFieldModule, InputIconModule],
  templateUrl: './apartments-table.component.html',
  styleUrl: './apartments-table.component.css'
})
export class ApartmentsTableComponent {
  table = viewChild<Table<Apartment>>('dt');

  apartmentFieldsLabels = ApartmentFields;

  apartmentsList$ = inject(ApartmentsService).list$;

  searchValue: string | undefined;

  onSearch($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.table()?.filterGlobal(input.value, 'contains');
  }
}
