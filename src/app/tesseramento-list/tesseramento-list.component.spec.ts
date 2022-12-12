import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesseramentoListComponent } from './tesseramento-list.component';

describe('TesseramentoListComponent', () => {
  let component: TesseramentoListComponent;
  let fixture: ComponentFixture<TesseramentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesseramentoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesseramentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
