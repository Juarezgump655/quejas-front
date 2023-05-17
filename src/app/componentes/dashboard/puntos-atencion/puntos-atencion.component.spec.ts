import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosAtencionComponent } from './puntos-atencion.component';

describe('PuntosAtencionComponent', () => {
  let component: PuntosAtencionComponent;
  let fixture: ComponentFixture<PuntosAtencionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosAtencionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
