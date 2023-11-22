import { NgModule } from '@angular/core';
import { BuyEntryComponent } from './buy-entry/buy-entry.component';
import { EntryRoutingModule } from './entry-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrComponent } from './qr/qr.component';
import { AssistantComponent } from './assistant/assistant.component';
import { ListAssistsComponent } from './list-assists/list-assists.component';

@NgModule({
  declarations: [
    BuyEntryComponent,
    QrComponent,
    ListAssistsComponent,
    AssistantComponent,
  ],
  imports: [
    EntryRoutingModule,
    ZXingScannerModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    BuyEntryComponent,
    AssistantComponent,
    QrComponent
  ],
  providers: [],
})
export class EntryModule {}
