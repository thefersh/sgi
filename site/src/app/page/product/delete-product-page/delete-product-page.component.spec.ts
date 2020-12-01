import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductPageComponent } from './delete-product-page.component';

describe('DeleteProductPageComponent', () => {
  let component: DeleteProductPageComponent;
  let fixture: ComponentFixture<DeleteProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
