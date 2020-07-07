import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Patient, StatusEnum ,AddressEnum} from '../patient.model';

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
    { id: 1, status: StatusEnum.MILD },
    { id: 2, status: StatusEnum.MODERATE },
    { id: 3, status: StatusEnum.CRITICAL },
    { id: 4, status: StatusEnum.RECOVERED },
    { id: 5, status: StatusEnum.DECEASED },
  ];
  addresses = [
    { id: 1, address: AddressEnum.MAPUSA },
    { id: 2, address: AddressEnum.MARGAO },
    { id: 3, address: AddressEnum.PANJIM },
    { id: 4, address: AddressEnum.PONDA },
    { id: 5, address: AddressEnum.QUEPEM },
    { id: 6, address: AddressEnum.VALPOI },
    { id: 7, address: AddressEnum.VASCO },
  ];
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      age: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)],
      }),
      familyCount: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(1)],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)],
      }),
      status: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

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
      this.patientService.addPatient(this.form.value);
    } else {
      this.patientService.updatePatient(this.patientId, this.form.value);
    }
    this.form.reset();
  }
}
