import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error!: string;
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (!form.valid) return;

    const { email, password } = form.value;

    this.authService.login(email, password).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  onCloseAlert() {
    this.error = '';
  }
}
