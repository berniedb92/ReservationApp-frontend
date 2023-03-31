import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientiAddComponent } from './clienti-add.component';

describe('ClientiAddComponent', () => {
  let component: ClientiAddComponent;
  let fixture: ComponentFixture<ClientiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientiAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
