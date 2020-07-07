import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import { DataVisualComponent } from './components/data-visual/data-visual.component';

const routes: Routes = [
  {
    path: '',
    component: ListPatientsComponent,

  },
  { path: 'add', component: AddPatientComponent },
  { path: 'visuals', component: DataVisualComponent },
  { path: 'edit/:patientId', component: AddPatientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
