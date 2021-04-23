import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutv1Component } from './layoutv1.component';

describe('Layoutv1Component', () => {
  let component: Layoutv1Component;
  let fixture: ComponentFixture<Layoutv1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Layoutv1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Layoutv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
