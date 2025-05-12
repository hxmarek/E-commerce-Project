import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeletestoreComponent } from './admindeletestore.component';

describe('AdmindeletestoreComponent', () => {
  let component: AdmindeletestoreComponent;
  let fixture: ComponentFixture<AdmindeletestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindeletestoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindeletestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
