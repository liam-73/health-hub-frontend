import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent {
  admin: Admin | null = null;
  error!: string;

  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { email, password } = form.value;

    this.userService.createAdmin(email, password).subscribe(
      (admin) => {
        this.admin = admin;
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  onCloseAlert() {
    this.admin = null;
    this.error = '';
  }
}
