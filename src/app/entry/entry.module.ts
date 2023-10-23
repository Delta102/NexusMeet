import { NgModule } from '@angular/core';
import { BuyEntryComponent } from './buy-entry/buy-entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuyEntryComponent
  ],
  imports: [
    EntryRoutingModule,
    FormsModule
  ],
  exports: [
    BuyEntryComponent
  ],
  providers: [],
})
export class EntryModule {}
