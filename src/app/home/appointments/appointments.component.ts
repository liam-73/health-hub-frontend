import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppointmentRes } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {
  appointments!: AppointmentRes[];
  appointmentsSub!: Subscription;

  filterDate: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentsService
  ) {}

  ngOnInit() {
    const params = new HttpParams();
    this.appointmentService.getAppointmentsFromServer(params).subscribe();

    this.appointmentsSub =
      this.appointmentService.appointmentsChanged.subscribe(
        (appointments: AppointmentRes[]) => {
          this.appointments = appointments;
        }
      );

    this.appointments = this.appointmentService.getAppointments();
  }

  onCreateAppt() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onFilter() {
    const params = new HttpParams()
      .set('start_date', this.filterDate.start.toISOString())
      .set('end_date', this.filterDate.end.toISOString());

    console.log(params.get('start_date'));

    this.appointmentService
      .getAppointmentsFromServer(params)
      .subscribe((res) => {
        this.appointments = res.appointments;
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.appointmentsSub.unsubscribe();
  }
}
