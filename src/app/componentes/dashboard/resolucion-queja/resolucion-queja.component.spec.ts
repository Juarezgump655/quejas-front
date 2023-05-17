/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResolucionQuejaComponent } from './resolucion-queja.component';

describe('ResolucionQuejaComponent', () => {
  let component: ResolucionQuejaComponent;
  let fixture: ComponentFixture<ResolucionQuejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolucionQuejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolucionQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
