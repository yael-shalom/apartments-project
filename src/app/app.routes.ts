import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ApartmentsTableComponent } from './components/apartments-table/apartments-table.component';
import { GraphsComponent } from './graphs/graphs.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'table', component: ApartmentsTableComponent },
  { path: 'graphs', component: GraphsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}