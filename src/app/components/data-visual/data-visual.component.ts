import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-data-visual',
  templateUrl: './data-visual.component.html',
  styleUrls: ['./data-visual.component.scss'],
})
export class DataVisualComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  private patientSub: Subscription;

  view: any[] = [700, 400];

  // options

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Areas';
  showYAxisLabel = true;
  yAxisLabel = 'Cases';
  addressData: { name: string; value: number }[] = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientService.getPatients();

    this.patientSub = this.patientService
      .getPatientUpdateListener()
      .subscribe((patientData: { patients: Patient[] }) => {
        this.patients = patientData.patients;
        var counts = {};
        let count = 0;
        this.patients.map((patient) => {
          let key = JSON.stringify(patient.address);
          counts[key] = (counts[key] || 0) + 1;
          // YET TO FIGURE OUT LOGIC
          console.log(count);
          this.addressData.push({ name: patient.address, value: count });
          this.addressData = [...this.addressData];
        });
        console.log(this.addressData);
        console.log(counts);
      });
  }
  ngOnDestroy() {
    this.patientSub.unsubscribe();
  }
}
