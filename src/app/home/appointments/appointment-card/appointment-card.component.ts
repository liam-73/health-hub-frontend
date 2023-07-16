import { Component, Input } from '@angular/core';

import { AppointmentRes } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  @Input() appointment!: AppointmentRes;
}
