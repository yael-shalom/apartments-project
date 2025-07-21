import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) {}

  moveToTable() {
    this.router.navigate(['/table']); // שנה לכתובת ה-URL הרצויה
  }

  moveToGraphs() {
    this.router.navigate(['/graphs']); // שנה לכתובת ה-URL הרצויה
  }
}