import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Employee, Patient } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
  @Input() user!: Patient | Doctor | Employee;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onViewDetail() {
    this.router.navigate([`${this.user._id}`], { relativeTo: this.route });
  }
}
