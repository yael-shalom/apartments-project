import { VerticalBarComponent } from '../components/vertical-bar/vertical-bar.component'
import { Component } from '@angular/core';
import { BarComponent } from "../components/bar/bar.component";
import { PieBarComponent } from "../components/pie-bar/pie-bar.component";
import { LineGraphComponent } from "../components/line-graph/line-graph.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApartmentFields } from '../shared/models/apartment-fields';

@Component({
  selector: 'app-graphs',
  imports: [VerticalBarComponent, BarComponent, PieBarComponent, LineGraphComponent, CommonModule, FormsModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent {
  selectedY: keyof typeof ApartmentFields | '' = '';
  currentGraph: string = "pie-bar";
  fields = Object.keys(ApartmentFields).filter(f => f !== '_id');
  fieldLabels = ApartmentFields;
  selectedField: keyof typeof ApartmentFields = 'year';

  showGraph(graphType: string) {
    this.currentGraph = graphType;
    if (!this.selectedField) {
      this.selectedField = 'year';
    }
  }

  getFieldLabel(field: string): string {
    return this.fieldLabels[field as keyof typeof ApartmentFields] ?? field;
  }
}
