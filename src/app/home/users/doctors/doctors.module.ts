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
  NbTabsetModule,
} from '@nebular/theme';

// module
import { UserCardModule } from '../user-card/user-card.module';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';

// components
import { DoctorsComponent } from './doctors.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
  },
  {
    path: 'create',
    component: DoctorFormComponent,
  },
  {
    path: ':id',
    component: DoctorDetailComponent,
  },
  {
    path: ':id/edit',
    component: DoctorFormComponent,
  },
];

@NgModule({
  declarations: [DoctorsComponent, DoctorFormComponent, DoctorDetailComponent],
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
    NbTabsetModule,
  ],
  providers: [],
})
export class DoctorsModule {}
