import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Patient } from 'src/app/models/patient.model';
import { PatientVisitsService } from 'src/app/services/patient-visits.service';

@Component({
  selector: 'app-record-visit',
  templateUrl: './record-visit.component.html',
  styleUrls: ['./record-visit.component.scss'],
})
export class RecordVisitComponent implements OnInit {
  @Input() patient!:Patient;
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,    private patientVitalsService: PatientVisitsService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      patient: [this.patient],
      visitDate: [null, [Validators.required]],
      visitReason: [null, [Validators.required]],
      visitDuration: [null, [Validators.required]],
    });
    console.log(this.patient)
  }

  submitForm(): void {
    this.patientVitalsService.create(this.validateForm.value).subscribe({
      next: (data) => {
        this.notification.success(
          'Success', // these are the title
          'Visit added!', // and the description of the notification
          { nzDuration: 3000 } // this is optional configuration, e.g., duration in ms
        );
        this.drawerRef.close(); // this dismisses the drawer
      },
      error: (err) => {
        this.notification.error(
          'Error', // these are the title
          'Failed to add visit', // and the description of the notification
          { nzDuration: 3000 } // this is optional configuration, e.g., duration in ms
        );
        console.log(err);
      },
    });
  }
  disabledDate = (current: Date): boolean => {
    // Disable dates before today
    return current > new Date();
  };
}
