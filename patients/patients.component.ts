import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { PatientService } from 'src/app/services/patient.service';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ApiResponse } from 'src/app/models/api-page.model';
import { RecordVisitComponent } from '../record-visit/record-visit.component';
import { Patient } from 'src/app/models/patient.model';
import { ViewPatientComponent } from '../view-patient/view-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  constructor(
    private patientService: PatientService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getPatients({});
  }

  getPatients(page: {}) {
    this.patientService.getAll(page).subscribe({
      next: (data: ApiResponse) => {
        this.patients = data.content;
        console.log(data);
      },
      error: (err) => console.log,
    });
  }

  addPatient() {
    const drawerRef = this.drawerService.create<
      AddPatientComponent,
      { value: string },
      string
    >({
      nzTitle: 'Add Patient',
      nzFooter: '',
      nzExtra: '',
      nzWidth: 1000,
      nzMaskClosable: false,
      nzContent: AddPatientComponent,
    });

    drawerRef.afterOpen.subscribe(() => {});

    drawerRef.afterClose.subscribe((data: any) => {});
  }

  recordVisit(patient: Patient) {
    const drawerRef = this.drawerService.create<
      RecordVisitComponent,
      { patient:Patient },
      string
    >({
      nzTitle: 'Record Visit',
      nzFooter: '',
      nzExtra: '',
      nzWidth: 1000,
      nzMaskClosable: false,
      nzContent: RecordVisitComponent,
      nzContentParams: {
        patient,
      },
    });

    drawerRef.afterOpen.subscribe(() => {});

    drawerRef.afterClose.subscribe((data: any) => {});
  }

  viewPatient(patient: Patient) {
    const drawerRef = this.drawerService.create<
      ViewPatientComponent,
      { patient:Patient },
      string
    >({
      nzTitle: 'View Patient',
      nzFooter: '',
      nzExtra: '',
      nzWidth: 1000,
      nzMaskClosable: false,
      nzContent: ViewPatientComponent,
      nzContentParams: {
        patient,
      },
    });

    drawerRef.afterOpen.subscribe(() => {});

    drawerRef.afterClose.subscribe((data: any) => {});
  }
}
