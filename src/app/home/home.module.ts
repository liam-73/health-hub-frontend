import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbCardModule,
} from '@nebular/theme';

import { PagesRoutingModule } from './home-routing.module';

// components
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule,
    NbContextMenuModule,
    NbIconModule,
    NbListModule,
    NbCardModule,
  ],
})
export class HomeModule {}
