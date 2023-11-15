import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './components/manage-events/add-event/add-event.component';
import { ManageEventsComponent } from './components/manage-events/manage-events.component';
import { DetailEventComponent } from './components/manage-events/detail-event/detail-event.component';
import { AssistantComponent } from '../entry/assistant/assistant.component';
// import { QrComponent } from '../entry/qr/qr.component';

const routes: Routes = [
  { path: 'add-event', component: AddEventComponent },
  // { path: 'manage-events/:userId', component: ManageEventsComponent },
  // {path: 'qr-scan', component: QrComponent},
  {
    path: 'detail-event/:eventId',
    component: DetailEventComponent,
    children: [
      { path: '', loadChildren: () => import('../entry/entry.module').then( m => m.EntryModule ), },
      { path: 'qr', loadChildren: () => import('../entry/entry.module').then( m => m.EntryModule ), },
      { path: 'assistant/:eventId', component: AssistantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class EventsRoutingModule {}
