import { Component, OnInit, PLATFORM_ID, ChangeDetectorRef, inject, effect } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ApartmentsService } from '../../shared/services/apartments.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-vertical-bar',
	imports: [CommonModule, ChartModule],
	templateUrl: './vertical-bar.component.html',
	styleUrl: './vertical-bar.component.css'
})
export class VerticalBarComponent implements OnInit {
	data: any;

	options: any;

	years: number[] = []

	platformId = inject(PLATFORM_ID);

	apartmentsList$ = inject(ApartmentsService).list$;
	apartmentsYears$ = inject(ApartmentsService).years$;
	fourCount: any;
	threeCount: any;

	// configService = inject(ConfigService);
	// designerService = inject(DesignerService);
	// private : ChangeDetectorRef

	constructor() {
		// { 2020: 10, 2021: 20, 2022: 30, 2023: 40 }

		this.apartmentsList$.subscribe(lst => {
			this.years = [...new Set(lst.map(apartment => apartment.year))].sort((a, b) => a - b);

			
			this.fourCount = lst.reduce((dict: any, current) => {
				if (!dict[current.year]) {
					dict[current.year] = 0;
				}
				dict[current.year] += current['4+ rooms apartments'];
				return dict;
			}, {});
			
			this.threeCount = lst.reduce((dict: any, current) => {
				if (!dict[current.year]) {
					dict[current.year] = 0;
				}
				dict[current.year] += current['3 rooms apartments'];
				return dict;
			}, {});

			console.log('Apartments List:', lst)
			console.log(this.fourCount)
			console.log(this.threeCount);
			console.log(this.years);
			

			this.initChart();
		});

		// this.apartmentsYears$.subscribe(years => {
		// 	this.years = years;
		// 	console.log('Apartments Years:', years);
		// });
	}

	themeEffect = effect(() => {
		// if (this.configService.transitionComplete()) {
		//   if (this.designerService.preset()) {
		//     this.initChart();
		//   }
		// }
	});

	ngOnInit() {
		this.initChart();
	}

	initChart() {
		if (isPlatformBrowser(this.platformId)) {
			const documentStyle = getComputedStyle(document.documentElement);
			const textColor = documentStyle.getPropertyValue('--p-text-color');
			const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
			const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

			this.data = {
				labels: this.years,
				datasets: [
					{
						label: '3 Rooms',
						backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
						borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
						data: Object.values(this.threeCount)
					},
					{
						label: '4+ Rooms',
						backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
						borderColor: documentStyle.getPropertyValue('--p-gray-500'),
						data: Object.values(this.fourCount)
					}
				]
			};

			this.options = {
				maintainAspectRatio: false,
				aspectRatio: 0.8,
				plugins: {
					legend: {
						labels: {
							color: textColor
						}
					}
				},
				scales: {
					x: {
						ticks: {
							color: textColorSecondary,
							font: {
								weight: 500
							}
						},
						grid: {
							color: surfaceBorder,
							drawBorder: false
						}
					},
					y: {
						ticks: {
							color: textColorSecondary
						},
						grid: {
							color: surfaceBorder,
							drawBorder: false
						}
					}
				}
			};
			// this.cd.markForCheck()
		}
	}
}
