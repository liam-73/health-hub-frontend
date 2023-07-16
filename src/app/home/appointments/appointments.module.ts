import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
} from '@nebular/theme';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { AppointmentsComponent } from './appointments.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
  },
  { path: 'create', component: NewAppointmentComponent },
];

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentCardComponent,
    NewAppointmentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NbIconModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbAutocompleteModule,
    NbDatepickerModule.forRoot(),
  ],
})
export class AppointmentsModule {}
