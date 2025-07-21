import { VerticalBarComponent } from '../components/vertical-bar/vertical-bar.component'
import { Component } from '@angular/core';
import { BarComponent } from "../components/bar/bar.component";
import { PieBarComponent } from "../components/pie-bar/pie-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graphs',
  imports: [VerticalBarComponent, BarComponent, PieBarComponent, CommonModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent {
    currentGraph: string = "";

    showGraph(graphType: string) {
        this.currentGraph = graphType;
    }
}
