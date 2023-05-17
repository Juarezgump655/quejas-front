/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeguimientoCentralizadorComponent } from './seguimiento-centralizador.component';

describe('SeguimientoCentralizadorComponent', () => {
  let component: SeguimientoCentralizadorComponent;
  let fixture: ComponentFixture<SeguimientoCentralizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoCentralizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoCentralizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
