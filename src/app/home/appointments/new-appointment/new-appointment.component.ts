import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-appointment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
})
export class NewAppointmentComponent implements OnInit {
  patients: any = [];
  doctors: any = [];

  createdAppt: Appointment | null = null;
  error!: string;

  filteredPatients$!: Observable<any>;
  filteredDoctors$!: Observable<any>;

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    let params = new HttpParams().set('user_type', 'PATIENT');
    this.userService.fetchUsers(params).subscribe((res) => {
      this.patients = res.users;
    });

    params = new HttpParams().set('user_type', 'DOCTOR');
    this.userService
      .fetchUsers(params)
      .subscribe((res) => (this.doctors = res.users));

    this.filteredPatients$ = of(this.patients);
    this.filteredDoctors$ = of(this.doctors);
  }

  private filter(value: string, type: string): [] {
    const filterValue = new RegExp(value, 'i');

    if (type == 'PATIENT')
      return this.patients.filter((patient: any) =>
        filterValue.test(patient.name)
      );

    return this.doctors.filter((doctor: any) => filterValue.test(doctor.name));
  }

  onModelChange(value: string, type: string) {
    if (type == 'PATIENT')
      this.filteredPatients$ = of(this.filter(value, type));
    else this.filteredDoctors$ = of(this.filter(value, type));
  }

  viewHandle(value: any) {
    return value.name ? value.name : value;
  }

  onSubmit(apptForm: NgForm) {
    if (!apptForm.valid) {
      return;
    }

    const { date, patient, doctor, reason } = apptForm.value;

    this.appointmentService
      .createAppointment(patient._id, doctor._id, date.toISOString(), reason)
      .subscribe(
        (appointment) => {
          this.createdAppt = appointment;
        },
        (errorMessage) => {
          this.error = errorMessage;
        }
      );

    apptForm.reset();
  }

  onCancel() {
    this.router.navigate(['/appointments']);
    this.error = '';
  }

  onCloseAlert() {
    this.error = '';
    this.createdAppt = null;
  }
}
