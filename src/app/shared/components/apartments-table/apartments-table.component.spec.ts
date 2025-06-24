import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsTableComponent } from './apartments-table.component';

describe('ApartmentsTableComponent', () => {
  let component: ApartmentsTableComponent;
  let fixture: ComponentFixture<ApartmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
