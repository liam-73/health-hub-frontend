import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbCardModule,
  NbIconModule,
  NbLayoutModule,
  NbTooltipModule,
} from '@nebular/theme';
import { ShortenPipe } from 'src/app/pipes/shorten.pipe';
import { UserCardComponent } from './user-card.component';

@NgModule({
  declarations: [UserCardComponent, ShortenPipe],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbLayoutModule,
    NbTooltipModule,
    NbIconModule,
  ],
  exports: [UserCardComponent, ShortenPipe],
  providers: [],
})
export class UserCardModule {}
