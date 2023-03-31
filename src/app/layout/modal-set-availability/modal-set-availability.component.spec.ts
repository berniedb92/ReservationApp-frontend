import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSetAvailabilityComponent } from './modal-set-availability.component';

describe('ModalSetAvailabilityComponent', () => {
  let component: ModalSetAvailabilityComponent;
  let fixture: ComponentFixture<ModalSetAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSetAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSetAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
