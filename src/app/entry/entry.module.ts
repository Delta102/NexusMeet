import { NgModule } from '@angular/core';
import { BuyEntryComponent } from './buy-entry/buy-entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BuyEntryComponent
  ],
  imports: [
    EntryRoutingModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    BuyEntryComponent
  ],
  providers: [],
})
export class EntryModule {}
