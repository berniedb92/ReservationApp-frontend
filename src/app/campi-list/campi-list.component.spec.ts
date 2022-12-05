import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampiListComponent } from './campi-list.component';

describe('CampiListComponent', () => {
  let component: CampiListComponent;
  let fixture: ComponentFixture<CampiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampiListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
