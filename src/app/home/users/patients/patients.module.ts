import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbRadioModule,
} from '@nebular/theme';

// modules
import { UserCardModule } from '../user-card/user-card.module';

// components
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
  { path: 'create', component: PatientFormComponent },
  {
    path: ':id',
    component: PatientDetailComponent,
  },
  { path: ':id/edit', component: PatientFormComponent },
];

@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailComponent,
    PatientFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NbRadioModule,
    NbLayoutModule,
    UserCardModule,
  ],
  providers: [],
})
export class PatientsModule {}
