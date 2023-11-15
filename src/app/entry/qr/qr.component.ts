import { Component, OnInit } from '@angular/core';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'app-qr',
  template: `
  <div class="relative w-full max-w-2x1 mx-auto max-h-[90vh] overflow-y-auto">
    <div class="bg-white rounded-lg shadow dark:bg-gray-700">
      <div class="p-6 space-y-6">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
          Registrar Asistencia
        </h3>
        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" (click)="closeModal()" data-modal-hide="defaultModal">
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </div>
        <div class="relative z-0 w-full mb-6 group">
          <zxing-scanner
            class="w-full h-full"
            [torch]="true"
            [tryHarder]="true"
            (scanSuccess)="onScanSuccess($event)"
            (scanError)="onScanError($event)"
          ></zxing-scanner>
          <p *ngIf="scannedValue" class="bg-green-500 text-white p-4 rounded">Código QR escaneado: {{ scannedValue }}</p>
          <p *ngIf="errorMessage" class="bg-red-500 text-white p-4 rounded">Código QR escaneado: {{ errorMessage }}</p>
          <button *ngIf="buttonForAccept"  class=" center text-white bg-blue-950 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" (click)="updateQR()">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
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

    `,
  ],
})


export class QrComponent implements OnInit{
  scannedValue: string = '';
  errorMessage: string = '';
  private scanningEnabled: boolean = true;
  buttonForAccept: boolean = false;
  constructor(public modalService: ModalCommunicationService, private entryService: EntryService) {}


  closeModal() {
    this.modalService.closeAttendeeModal();
  }

  ngOnInit(): void {
    console.log('Complemento QR Iniciado');

  }

  onScanSuccess(result: string): void {
    if(this.scanningEnabled){

      this.scanningEnabled = false;
      this.entryService.sendScannedValue(result).subscribe(
        (response: any) => {
          console.log(response.message);

          if (response.message === 'Attendance already registered') {
            this.errorMessage = '¡La asistencia ya ha sido registrada!';
            this.scannedValue = '';
          }
          else{
            console.log('Valor escaneado enviado', response);
            this.scannedValue = "Asistencia Registrada con éxito";
            this.errorMessage = '';
            this.buttonForAccept = true;
          }
        },
        (error) => {
          console.log('Valor no escaneado', error);
          this.buttonForAccept = true;
        }
      )
    }

  }

  onScanError(error: Error): void {
    console.error(error);
  }

  updateQR(){
    this.scannedValue = '';
    this.scanningEnabled = true;
  }
}
