import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventDataSource } from './datasources/event.datasource';
import { ListComponent } from './components/list/list.component';
import { AddEventComponent } from './components/manage-events/add-event/add-event.component';
import { EventsRoutingModule } from './events-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ManageEventsComponent } from './components/manage-events/manage-events.component';
import { EditEventComponent } from './components/manage-events/edit-event/edit-event.component';
import { DeleteEventComponent } from './components/manage-events/delete-event/delete-event.component';
import { EventCardImageComponent } from './components/event-card-image/event-card-image.component';
import { DetailEventComponent } from './components/manage-events/detail-event/detail-event.component';
import { EventMapComponent } from './components/event-map/event-map.component';
import { EntryModule } from '../entry/entry.module';


@NgModule({
  declarations: [
    ListComponent,
    AddEventComponent,
    ManageEventsComponent,
    EditEventComponent,
    DeleteEventComponent,
    EventCardImageComponent,
    DetailEventComponent,
    EventMapComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    EventsRoutingModule,
    EntryModule,
    HttpClientModule,
  ],
  exports: [
    ListComponent
  ],
  providers: [
    EventDataSource,
  ],
})
export class EventsModule { }
