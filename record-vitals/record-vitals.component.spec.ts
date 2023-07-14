import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordVitalsComponent } from './record-vitals.component';

describe('RecordVitalsComponent', () => {
  let component: RecordVitalsComponent;
  let fixture: ComponentFixture<RecordVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordVitalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
