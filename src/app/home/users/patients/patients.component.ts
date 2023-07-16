import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  patients!: Patient[];
  patientsSub!: Subscription;

  searchText!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const params = new HttpParams().set('user_type', 'PATIENT');
    this.userService.fetchUsers(params).subscribe();

    this.patientsSub = this.userService.patientsChanged.subscribe(
      (patients: Patient[]) => {
        this.patients = patients;
      }
    );

    this.patients = this.userService.getUsers('PATIENT');
  }

  onAddUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onSearch() {
    this.userService
      .onSearchUsers(this.searchText, 'PATIENT')
      .subscribe((res) => {
        this.patients = res.users;
      });
  }

  ngOnDestroy() {
    this.patientsSub.unsubscribe();
  }
}
