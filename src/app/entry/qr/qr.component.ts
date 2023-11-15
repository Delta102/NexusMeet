import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  template: `
    <zxing-scanner
      [torch]="true"
      [tryHarder]="true"
      (scanSuccess)="onScanSuccess($event)"
      (scanError)="onScanError($event)"
    ></zxing-scanner>
    <p *ngIf="scannedValue">Código QR escaneado: {{ scannedValue }}</p>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      zxing-scanner {
        width: 300px;
        height: 300px;
        border: 2px solid #333;
      }
    `,
  ],
})
export class QrComponent implements OnInit{
  scannedValue: string = '';

  ngOnInit(): void {
    console.log('Complemento QR Iniciado');

  }

  onScanSuccess(result: string): void {
    this.scannedValue = result;
    console.log(this.scannedValue);

  }

  onScanError(error: Error): void {
    console.error(error);
  }
}
