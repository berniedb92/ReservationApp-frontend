import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDayComponent } from './reservation-day.component';

describe('ReservationDayComponent', () => {
  let component: ReservationDayComponent;
  let fixture: ComponentFixture<ReservationDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
