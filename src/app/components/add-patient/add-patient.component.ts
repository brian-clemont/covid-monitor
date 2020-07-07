import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  form: FormGroup;
  patient: Patient;
  mode = 'add';
  patientId: string;
  patientStatus = [
    { id: 1, status: 'mild' },
    { id: 2, status: 'moderate' },
    { id: 3, status: 'critical' },
    { id: 4, status: 'recovered' },
    { id: 5, status: 'deceased' },
  ];
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('Patient', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      address: new FormControl('Mangor hill', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      age: new FormControl(33, {
        validators: [Validators.required, Validators.maxLength(3)],
      }),
      familyCount: new FormControl(5, {
        validators: [Validators.required, Validators.maxLength(2)],
      }),
      phone: new FormControl(98955545, {
        validators: [Validators.required, Validators.maxLength(10)],
      }),
      status: new FormControl('recovered', {
        validators: [Validators.required],
      }),
    });

    console.log('Values', this.form.value);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('patientId')) {
        this.mode = 'edit';
        this.patientId = paramMap.get('patientId');
        this.patientService
          .getPatient(this.patientId)
          .subscribe((patientData) => {
            this.patient = {
              id: patientData._id,
              name: patientData.name,
              address: patientData.address,
              age: patientData.age,
              familyCount: patientData.familyCount,
              phone: patientData.phone,
              status: patientData.status,
            };
            this.form.setValue({
              name: this.patient.name,
              address: this.patient.address,
              age: this.patient.age,
              familyCount: this.patient.familyCount,
              phone: this.patient.phone,
              status: this.patient.status,
            });
          });
      } else {
        this.mode = 'add';
        this.patientId = null;
      }
    });
  }

  onSavePatient() {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'add') {
      this.patientService.addPatient(
        this.form.value
      );
    } else {
      this.patientService.updatePatient(this.patientId, this.form.value);
    }
    // this.form.reset()
  }
}
