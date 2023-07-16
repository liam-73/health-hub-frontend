import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { SIDEBAR_MENU } from '../config/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  sidebarMenu: any;
  isSideBarCompacted: boolean = true;

  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit() {
    this.sidebarMenu = SIDEBAR_MENU;
  }

  onToggleSidebar() {
    this.sidebarService.toggle(true);
  }

  onMenuClick(evt: Event) {
    this.onToggleSidebar();
  }
}
