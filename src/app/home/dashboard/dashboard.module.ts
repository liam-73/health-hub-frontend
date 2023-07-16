import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSidebarModule,
  NbWindowModule,
} from '@nebular/theme';
import { AdminFormComponent } from '../users/admin/admin-form/admin-form.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent, AdminFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NbSidebarModule,
    NbIconModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbWindowModule.forRoot(),
    FormsModule,
  ],
})
export class DashboardModule {}
