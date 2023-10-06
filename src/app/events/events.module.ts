import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/home/main.component';
import { EventDataSource } from './datasources/event.datasource';
import { ListComponent } from './components/list/list.component';
import { AddEventComponent } from './components/manage-events/add-event/add-event.component';
import { EventsRoutingModule } from './events-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from '../users/components/add-user/add-user.component';
import { LoginComponent } from '../users/components/login/login.component';
import { ManageEventsComponent } from './components/manage-events/manage-events.component';
import { EditEventComponent } from './components/manage-events/edit-event/edit-event.component';
import { DeleteEventComponent } from './components/manage-events/delete-event/delete-event.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddUserComponent,
    LoginComponent,
    AddEventComponent,
    ManageEventsComponent,
    EditEventComponent,
    DeleteEventComponent,
  ],

  imports: [
    CommonModule,
    FormsModule,
    EventsRoutingModule,
    HttpClientModule,
  ],
  providers: [
    EventDataSource,
  ],

  exports: [
    MainComponent,
  ],
})
export class EventsModule { }
