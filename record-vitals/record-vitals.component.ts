import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { VitalsService } from 'src/app/services/vitals.service';

@Component({
  selector: 'app-record-vitals',
  templateUrl: './record-vitals.component.html',
  styleUrls: ['./record-vitals.component.scss'],
})
export class RecordVitalsComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vitalService: VitalsService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      bloodPressure: [null, [Validators.required]],
      bodyTemperature: [null, [Validators.required]],
      heartRate: [null, [Validators.required]],
      weight: [null, [Validators.required]],
      height: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.vitalService.create(this.validateForm.value).subscribe({
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
}
