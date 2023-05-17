/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TipoQuejasComponent } from './tipo-quejas.component';

describe('TipoQuejasComponent', () => {
  let component: TipoQuejasComponent;
  let fixture: ComponentFixture<TipoQuejasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoQuejasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoQuejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
