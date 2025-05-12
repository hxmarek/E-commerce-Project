import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindeleteuserComponent } from './admindeleteuser.component';

describe('AdmindeleteuserComponent', () => {
  let component: AdmindeleteuserComponent;
  let fixture: ComponentFixture<AdmindeleteuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindeleteuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindeleteuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
