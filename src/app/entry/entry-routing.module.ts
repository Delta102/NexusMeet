import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyEntryComponent } from './buy-entry/buy-entry.component';
import { AssistantComponent } from './assistant/assistant.component';
import { QrComponent } from './qr/qr.component';

const routes: Routes = [
  { path: 'buy-entry', component: BuyEntryComponent },
  { path: 'qr', component: QrComponent},
  { path: 'assistant', component: AssistantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
