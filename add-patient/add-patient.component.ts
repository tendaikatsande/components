import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      contactInformation: [null, [Validators.required]],
      insuranceDetails: [null, [Validators.required]],
      medicalHistory: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.patientService.create(this.validateForm.value).subscribe({
      next: (data) => {
        this.notification.success(
          'Success', // these are the title
          'Patient is added!', // and the description of the notification
          { nzDuration: 3000 } // this is optional configuration, e.g., duration in ms
        );
        this.drawerRef.close(); // this dismisses the drawer
      },
      error: (err) => {
        this.notification.error(
          'Error', // these are the title
          'Failed to add the patient', // and the description of the notification
          { nzDuration: 3000 } // this is optional configuration, e.g., duration in ms
        );
        console.log(err)
      },
    });
  }
}
