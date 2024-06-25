import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleRadialBarComponent } from './multiple-radial-bar.component';

describe('MultipleRadialBarComponent', () => {
  let component: MultipleRadialBarComponent;
  let fixture: ComponentFixture<MultipleRadialBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleRadialBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleRadialBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
