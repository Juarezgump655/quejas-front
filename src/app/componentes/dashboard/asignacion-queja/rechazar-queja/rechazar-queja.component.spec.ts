/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RechazarQuejaComponent } from './rechazar-queja.component';

describe('RechazarQuejaComponent', () => {
  let component: RechazarQuejaComponent;
  let fixture: ComponentFixture<RechazarQuejaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazarQuejaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarQuejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
