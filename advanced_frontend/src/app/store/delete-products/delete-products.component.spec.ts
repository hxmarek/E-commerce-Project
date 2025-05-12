import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductsComponent } from './delete-products.component';

describe('DeleteProductsComponent', () => {
  let component: DeleteProductsComponent;
  let fixture: ComponentFixture<DeleteProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
