import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './pages/home/main.component';
import { EventDataSource } from './datasources/event.datasource';
import { ListComponent } from './components/list/list.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventsRoutingModule } from './events-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddEventComponent
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
