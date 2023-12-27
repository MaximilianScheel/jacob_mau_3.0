import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyConsultingComponent } from './energy-consulting.component';

describe('EnergyConsultingComponent', () => {
  let component: EnergyConsultingComponent;
  let fixture: ComponentFixture<EnergyConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyConsultingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
