import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit, OnDestroy {
  doctors!: Doctor[];
  doctorsSub!: Subscription;

  searchText!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const params = new HttpParams().set('user_type', 'DOCTOR');
    this.userService.fetchUsers(params).subscribe();

    this.doctorsSub = this.userService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      }
    );

    this.doctors = this.userService.getUsers('DOCTOR');
  }

  onAddUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onSearch() {
    this.userService
      .onSearchUsers(this.searchText, 'DOCTOR')
      .subscribe((res) => {
        this.doctors = res.users;
      });
  }

  ngOnDestroy() {
    this.doctorsSub.unsubscribe();
  }
}
