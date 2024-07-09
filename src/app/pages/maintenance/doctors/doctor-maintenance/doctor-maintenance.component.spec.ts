import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMaintenanceComponent } from './doctor-maintenance.component';

describe('DoctorMaintenanceComponent', () => {
  let component: DoctorMaintenanceComponent;
  let fixture: ComponentFixture<DoctorMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
