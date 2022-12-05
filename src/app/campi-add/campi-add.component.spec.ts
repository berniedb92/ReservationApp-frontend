import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampiAddComponent } from './campi-add.component';

describe('CampiAddComponent', () => {
  let component: CampiAddComponent;
  let fixture: ComponentFixture<CampiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampiAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
