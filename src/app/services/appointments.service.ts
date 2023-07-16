import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment, AppointmentRes } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  baseUrl = `${environment.host}/appointments`;

  appointments!: AppointmentRes[];
  appointmentsChanged = new Subject<AppointmentRes[]>();

  constructor(private http: HttpClient) {}

  setAppointments(appointments: AppointmentRes[]) {
    this.appointments = appointments;
    this.appointmentsChanged.next(this.appointments);
  }

  getAppointments() {
    return this.appointments;
  }

  getAppointmentsFromServer(params: HttpParams) {
    return this.http
      .get<{ appointments: AppointmentRes[]; count: number }>(
        `${this.baseUrl}`,
        { params }
      )
      .pipe(
        tap((res) => {
          this.setAppointments(res.appointments);
        })
      );
  }

  createAppointment(
    patient: string,
    doctor: string,
    date: string,
    reason: string
  ) {
    return this.http
      .post<Appointment>(`${this.baseUrl}`, {
        patient,
        doctor,
        date,
        reason,
      })
      .pipe(
        catchError((error) => {
          let errorMessage = 'An unknown error occurred';

          if (!error.error || !error.error.error.message)
            return throwError(errorMessage);

          return throwError(error.error.error.message);
        })
      );
  }
}
