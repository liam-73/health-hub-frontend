import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UserService } from 'src/app/services/user.service';
import { AdminFormComponent } from '../users/admin/admin-form/admin-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  appointments!: number;
  todayAppt!: number;
  patients!: number;
  doctors!: number;

  constructor(
    private windowService: NbWindowService,
    private userService: UserService,
    private apptService: AppointmentsService
  ) {}

  ngOnInit() {
    let start_date = new Date();
    const end_date = new Date();

    start_date.setDate(end_date.getDate() - 7);

    let params = new HttpParams()
      .set('start_date', start_date.toISOString())
      .set('end_date', end_date.toISOString());

    this.apptService.getAppointmentsFromServer(params).subscribe((res) => {
      this.appointments = res.count;
    });

    params = new HttpParams().set('is_today_appts', true);
    this.apptService.getAppointmentsFromServer(params).subscribe((res) => {
      this.todayAppt = res.count;
    });

    params = new HttpParams()
      .set('start_date', start_date.toISOString())
      .set('end_date', end_date.toISOString())
      .set('user_type', 'PATIENT');
    this.userService.fetchUsers(params).subscribe((res) => {
      this.patients = res.count;
    });

    params = new HttpParams()
      .set('start_date', start_date.toISOString())
      .set('end_date', end_date.toISOString())
      .set('user_type', 'DOCTOR');
    this.userService.fetchUsers(params).subscribe((res) => {
      this.doctors = res.count;
    });
  }

  onAddAdmin() {
    this.windowService.open(AdminFormComponent, { title: `New Admin` });
  }
}
