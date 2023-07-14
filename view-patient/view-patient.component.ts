import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {

  @Input() patient!:Patient;
  constructor() { }

  ngOnInit(): void {
  }

}
