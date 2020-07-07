import { Injectable } from '@angular/core';
import { Patient } from '../components/patient.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Form } from '@angular/forms';

const BACKEND_URL = environment.apiUrl + '/patients/';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];
  private patientsUpdated = new Subject<{ patients: Patient[] }>();
  constructor(private http: HttpClient, private router: Router) {}

  addPatient(form: Form) {
    this.http
      .post<{ message: string; patient: Patient }>(BACKEND_URL, form)
      .subscribe((patientData) => {
        console.log(patientData);
      });
  }

  getPatients() {
    this.http
      .get<{ message: string; patients: any }>(BACKEND_URL)
      .pipe(
        map((patientData) => {
          return {
            patients: patientData.patients.map((patient) => {
              return {
                id: patient._id,
                name: patient.name,
                address: patient.address,
                age: patient.age,
                familyCount: patient.familyCount,
                phone: patient.phone,
                status: patient.status,
              };
            }),
          };
        })
      )
      .subscribe((data) => {
        this.patients = data.patients;
        this.patientsUpdated.next({
          patients: [...this.patients],
        });
      });
  }

  getPatient(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      address: string;
      age: number;
      familyCount: number;
      phone: number;
      status: string;
    }>(BACKEND_URL + id);
  }

  updatePatient(id: string, form: Form) {
    console.log('id', id);
    this.http.put(BACKEND_URL + id, form).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  getPatientUpdateListener() {
    return this.patientsUpdated.asObservable();
  }
  deletePatient(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
