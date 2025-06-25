import { Component, inject, OnInit } from '@angular/core';
import { ApartmentsTableComponent } from "./components/apartments-table/apartments-table.component";
import { VerticalBarComponent } from "./components/vertical-bar/vertical-bar.component";
import { PieBarComponent } from "./components/pie-bar/pie-bar.component";

@Component({
  selector: 'app-root',
  imports: [VerticalBarComponent, PieBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
