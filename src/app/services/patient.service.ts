import { Injectable } from '@angular/core';
import { Patient } from '../components/patient.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/patients/';
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private patients: Patient[] = [];
  private patientsUpdated = new Subject<{ patients: Patient[] }>();
  constructor(private http: HttpClient, private router: Router) {}

  addPatient(
    name: string,
    address: string,
    age: number,
    familyCount: number,
    phone: number,
    status: string
  ) {
    let patientData: Patient | FormData;
    patientData = new FormData();
    patientData.append('name', name);
    patientData.append('address', address);
    patientData.append('age', age.toString());
    patientData.append('familyCount', familyCount.toString());
    patientData.append('phone', phone.toString());
    patientData.append('status', status);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    let options = { headers: headers };
    this.http
      .post<{ message: string; patient: Patient }>(
        BACKEND_URL,
        patientData,
        options
      )
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
                phone:patient.phone,
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

  updatePatient(
    id: string,
    name: string,
    address: string,
    age: any,
    familyCount: any,
    phone: any,
    status: string
  ) {
    let patientData: Patient | FormData;
    patientData = new FormData();
    patientData.append('name', name);
    patientData.append('address', address);
    patientData.append('age', age);
    patientData.append('familyCount', familyCount);
    patientData.append('phone', phone);
    patientData.append('status', status);
    this.http.put(BACKEND_URL + id, patientData).subscribe((response) => {
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
