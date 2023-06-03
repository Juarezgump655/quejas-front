/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentasInvetarioComponent } from './ventas-invetario.component';

describe('VentasInvetarioComponent', () => {
  let component: VentasInvetarioComponent;
  let fixture: ComponentFixture<VentasInvetarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasInvetarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasInvetarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
