import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MainComponent } from './pages/home/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { EventCardImageComponent } from '../events/components/event-card-image/event-card-image.component';



@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsersModule,
    EventsModule
  ],
  exports: [
    MainComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
