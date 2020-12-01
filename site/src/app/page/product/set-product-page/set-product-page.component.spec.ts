import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProductPageComponent } from './set-product-page.component';

describe('SetProductPageComponent', () => {
  let component: SetProductPageComponent;
  let fixture: ComponentFixture<SetProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
