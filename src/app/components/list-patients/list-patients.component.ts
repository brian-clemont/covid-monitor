import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from '../patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  private patientSub: Subscription;
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients();

    this.patientSub = this.patientService
      .getPatientUpdateListener()
      .subscribe((patientData: { patients: Patient[] }) => {
        this.patients = patientData.patients;
      });
  }

  onDelete(patientId: string) {
    this.patientService.deletePatient(patientId).subscribe(() => {
      this.patientService.getPatients();
    });
  }

  ngOnDestroy() {
    this.patientSub.unsubscribe();
  }
}
