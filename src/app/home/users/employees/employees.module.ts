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

// module
import { UserCardModule } from '../user-card/user-card.module';

// components
import { EmployeesComponent } from './employees.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'create', component: EmployeeFormComponent },
  { path: ':id', component: EmployeeDetailComponent },
  { path: ':id/edit', component: EmployeeFormComponent },
];

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent,
    EmployeeDetailComponent,
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
export class EmployeesModule {}
