import { Component, inject, OnInit } from '@angular/core';
import { ApartmentsTableComponent } from "./components/apartments-table/apartments-table.component";

@Component({
  selector: 'app-root',
  imports: [ApartmentsTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
