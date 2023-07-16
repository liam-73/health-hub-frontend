import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { ICONS } from './config/icons-pack';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private iconLibraries: NbIconLibraries,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerIcons();

    this.authService.autoLogin();
  }

  registerIcons() {
    this.iconLibraries.registerSvgPack('customIcons', {
      menu: ICONS.menu,
      dashboard: ICONS.dashboard,
      appointments: ICONS.appointments,
      patients: ICONS.patients,
      doctors: ICONS.doctors,
      employees: ICONS.employees,
      logo: ICONS.logo,
      plus: ICONS.plus,
    });
  }
}
