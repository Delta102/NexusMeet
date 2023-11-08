import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { EventsByUserComponent } from './components/events-by-user/events-by-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserMainComponent } from './components/user-main/user-main.component';
import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
import { EventsModule } from '../events/events.module';
import { EntryByUserComponent } from './components/profile/entry-by-user/entry-by-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    AddUserComponent,
    EventsByUserComponent,
    ProfileComponent,
    UserMainComponent,
    EditUserComponent,
    EntryByUserComponent,
  ],

  imports: [
    FormsModule,
    UsersRoutingModule,
    EventsModule,
    SharedModule,
    CommonModule,
  ],
  providers: [
  ],

  exports: [
    LoginComponent,
    AddUserComponent
  ],
})
export class UsersModule { }
