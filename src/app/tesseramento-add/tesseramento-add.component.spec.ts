import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesseramentoAddComponent } from './tesseramento-add.component';

describe('TesseramentoAddComponent', () => {
  let component: TesseramentoAddComponent;
  let fixture: ComponentFixture<TesseramentoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesseramentoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesseramentoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
