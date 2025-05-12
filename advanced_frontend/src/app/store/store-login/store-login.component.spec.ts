import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLoginComponent } from './store-login.component';

describe('StoreLoginComponent', () => {
  let component: StoreLoginComponent;
  let fixture: ComponentFixture<StoreLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
