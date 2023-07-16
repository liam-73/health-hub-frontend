import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppointmentRes } from '../models/appointment.model';
import { Admin, Doctor, Employee, Patient } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = `${environment.host}/users`;

  patients!: Patient[];
  patientsChanged = new Subject<Patient[]>();

  doctors!: Doctor[];
  doctorsChanged = new Subject<Doctor[]>();

  employees!: Employee[];
  employeesChanged = new Subject<Employee[]>();

  appointments!: AppointmentRes[];

  constructor(private http: HttpClient) {}

  getUser(id: string, type: string) {
    if (type == 'PATIENT') return this.patients.filter((p) => p._id === id)[0];
    else if (type == 'DOCTOR')
      return this.doctors.filter((d) => d._id === id)[0];
    else return this.employees.filter((e) => e._id === id)[0];
  }

  getUsers(type: string) {
    if (type == 'PATIENT') return this.patients;
    else if (type == 'DOCTOR') return this.doctors;
    else return this.employees;
  }

  createAdmin(email: string, password: string) {
    return this.http
      .post<Admin>(`${environment.host}/admins/`, {
        email,
        password,
      })
      .pipe(catchError(this.handleError));
  }

  createUser(payload: FormData) {
    return this.http
      .post<Patient | Doctor | Employee>(`${this.baseUrl}`, payload)
      .pipe(catchError(this.handleError));
  }

  updateUser(payload: FormData, id: string) {
    return this.http
      .patch(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError(this.handleError));
  }

  fetchUsers(
    params: HttpParams
  ): Observable<{ users: Patient[] | Doctor[] | Employee[]; count: number }> {
    return this.http
      .get<{ users: Patient[] | Doctor[] | Employee[]; count: number }>(
        `${this.baseUrl}`,
        { params }
      )
      .pipe(
        tap((res) => {
          if (params.get('user_type') == 'PATIENT') {
            this.patients = res.users;
            this.patientsChanged.next(res.users);
          } else if (params.get('user_type') == 'DOCTOR') {
            this.doctors = res.users;
            this.doctorsChanged.next(res.users);
          } else {
            this.employees = res.users;
            this.employeesChanged.next(res.users);
          }
        })
      );
  }

  getAppointmentsByUserId(id: string) {
    return this.http.get<{ appointments: AppointmentRes[]; count: number }>(
      `${this.baseUrl}/${id}/appointments`
    );
  }

  getTranxByDoctorId(id: string) {
    const params = new HttpParams().set('doctor_id', id);
    return this.http.get(`${environment.host}/transactions`, { params });
  }

  onSearchUsers(search: string, type: string) {
    const params = new HttpParams()
      .set('search', search)
      .set('user_type', type);
    return this.http
      .get<{ users: Patient[] | Doctor[] | Employee[]; count: number }>(
        `${this.baseUrl}`,
        {
          params,
        }
      )
      .pipe(
        tap((res) => {
          if (type == 'PATIENT') {
            this.patients = res.users;
            this.patientsChanged.next(this.patients);
          } else if (type == 'DOCTOR') {
            this.doctors = res.users;
            this.doctorsChanged.next(this.doctors);
          } else {
            this.employees = res.users;
            this.employeesChanged.next(this.employees);
          }
        })
      );
  }

  deleteUser(id: string, type: string) {
    if (type == 'PATIENT') {
      this.patients = this.patients.filter((p) => p._id != id);
      this.patientsChanged.next(this.patients);
    } else if (type == 'DOCTOR') {
      this.doctors = this.doctors.filter((d) => d._id != id);
      this.doctorsChanged.next(this.doctors);
    } else {
      this.employees = this.employees.filter((e) => e._id != id);
      this.employeesChanged.next(this.employees);
    }
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes.error.error || errorRes.error.error.message)
      errorMessage = errorRes.error.error.message;

    return throwError(errorMessage);
  }
}
