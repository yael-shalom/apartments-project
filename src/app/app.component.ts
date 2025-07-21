import { HomePageComponent } from './home-page/home-page.component';
import { Component, inject, OnInit } from '@angular/core';
import { ApartmentsTableComponent } from "./components/apartments-table/apartments-table.component";
import { VerticalBarComponent } from "./components/vertical-bar/vertical-bar.component";
import { PieBarComponent } from "./components/pie-bar/pie-bar.component";
import { BarComponent } from "./components/bar/bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BarComponent, ApartmentsTableComponent, HomePageComponent, PieBarComponent, VerticalBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
