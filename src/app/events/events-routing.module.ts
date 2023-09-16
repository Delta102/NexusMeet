import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/home/main.component';
import { AddEventComponent } from './components/add-event/add-event.component';

const routes: Routes = [
  { path: 'add-event', component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
