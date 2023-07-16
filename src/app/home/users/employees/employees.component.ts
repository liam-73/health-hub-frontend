import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees!: Employee[];
  employeesSub!: Subscription;

  searchText!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const params = new HttpParams().set('user_type', 'EMPLOYEE');
    this.userService.fetchUsers(params).subscribe();

    this.employeesSub = this.userService.employeesChanged.subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      }
    );

    this.employees = this.userService.getUsers('EMPLOYEE');
  }

  onAddUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onSearch() {
    this.userService
      .onSearchUsers(this.searchText, 'EMPLOYEE')
      .subscribe((res) => {
        this.employees = res.users;
      });
  }

  ngOnDestroy(): void {
    this.employeesSub.unsubscribe();
  }
}
