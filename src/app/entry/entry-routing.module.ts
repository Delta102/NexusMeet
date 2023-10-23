import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyEntryComponent } from './buy-entry/buy-entry.component';
import { DetailEventComponent } from '../events/components/manage-events/detail-event/detail-event.component';

const routes: Routes = [
  { path: 'buy-entry', component: BuyEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
