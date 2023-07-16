import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppointmentRes } from 'src/app/models/appointment.model';
import { Doctor } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css'],
})
export class DoctorDetailComponent implements OnInit {
  id!: string;
  doctor!: Doctor;

  appointments!: AppointmentRes[];
  tranxDates!: string[];
  tranxs!: any;

  error!: string;
  succeed!: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.doctor = this.userService.getUser(this.id, 'DOCTOR');
      this.userService
        .getAppointmentsByUserId(this.id)
        .subscribe((res) => (this.appointments = res.appointments));

      this.userService.getTranxByDoctorId(this.id).subscribe((res) => {
        this.tranxDates = Object.keys(res);
        this.tranxs = res;
      });
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.userService.deleteUser(this.id, 'DOCTOR').subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
