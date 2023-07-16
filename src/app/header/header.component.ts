import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  menuState = new EventEmitter();

  isLoggedIn: boolean = false;
  adminSub: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.adminSub = this.authService.admin.subscribe((admin) => {
      this.isLoggedIn = !!admin;
    });
  }

  toggleSidebar() {
    this.menuState.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
  }
}
