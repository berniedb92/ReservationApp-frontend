import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCampoComponent } from './modal-add-campi.component';

describe('CampiAddComponent', () => {
  let component: ModalAddCampoComponent;
  let fixture: ComponentFixture<ModalAddCampoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddCampoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
