import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/user.model';

interface LoginResData {
  admin: {
    _id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  admin: BehaviorSubject<Admin | null> = new BehaviorSubject<Admin | null>(
    null
  );
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<LoginResData>(`${environment.host}/admins/login`, {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handleAuthentication(res);
        })
      );
  }

  autoLogin() {
    const adminData = localStorage.getItem('admin');

    if (!adminData) return;

    const { _id, email, token } = adminData ? JSON.parse(adminData) : '';

    const admin = new Admin(_id, email, token);

    if (admin.token) {
      this.admin.next(admin);
    }
  }

  logout() {
    this.admin.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('admin');
  }

  private handleAuthentication(resData: LoginResData) {
    const admin = new Admin(
      resData.admin._id,
      resData.admin.email,
      resData.token
    );

    this.admin.next(admin);

    localStorage.setItem('admin', JSON.stringify(admin));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (errorRes.error || errorRes.error.error.message) {
      errorMessage = errorRes.error.error.message;
    }

    return throwError(errorMessage);
  }
}
