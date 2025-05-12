import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminstoresComponent } from './adminstores.component';

describe('AdminstoresComponent', () => {
  let component: AdminstoresComponent;
  let fixture: ComponentFixture<AdminstoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminstoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminstoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
