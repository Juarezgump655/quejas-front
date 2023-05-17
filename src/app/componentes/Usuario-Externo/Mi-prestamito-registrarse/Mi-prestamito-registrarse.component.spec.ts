/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MiPrestamitoRegistrarseComponent } from './Mi-prestamito-registrarse.component';

describe('MiPrestamitoRegistrarseComponent', () => {
  let component: MiPrestamitoRegistrarseComponent;
  let fixture: ComponentFixture<MiPrestamitoRegistrarseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPrestamitoRegistrarseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPrestamitoRegistrarseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
