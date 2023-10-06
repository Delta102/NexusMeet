import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/home/main.component';
import { AddEventComponent } from './components/manage-events/add-event/add-event.component';
import { ManageEventsComponent } from './components/manage-events/manage-events.component';

const routes: Routes = [
  { path: 'add-event', component: AddEventComponent },
  { path: 'manage-events/:userId', component: ManageEventsComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
