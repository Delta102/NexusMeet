import { Component, Input, OnInit } from '@angular/core';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { EntryResponse } from '../interfaces/entry-response.interface';
import { EntryService } from '../services/entry.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'entry-buy-entry',
  templateUrl: './buy-entry.component.html',
  styles: [],
})
export class BuyEntryComponent implements OnInit {
  @Input()
  eventId!: number;
  isLoggedIn = false;
  userData!: any;

  entryResponse: EntryResponse = {
    id: 0,
    quantity: 0,
    priceTotal: 0,
    userId: 0,
    eventId: 0,
  };

  constructor(
    private modalService: ModalCommunicationService,
    private entryService: EntryService,
    private userService: UserService
  ) {}

  onTicketQuantityChange() {
    console.log(this.entryResponse.quantity);
  }

  onSubmit() {
    console.log('Datos a enviar:', this.userData['id']);
    console.log('Datos a enviar:', this.eventId.toString());
    const formData = new FormData();

    // Convierte a cadena
    formData.append('quantity', this.entryResponse.quantity.toString());
    formData.append('price_total', this.entryResponse.priceTotal.toString());
    formData.append('user', this.userData['id']);
    formData.append('event', this.eventId.toString());

    console.log(formData);

    this.entryService.addEntry(formData).subscribe((response: any) => {
      console.log('Entrada comprada con éxito', response);
      window.location.reload();
    });
  }

  detectCreditCardType(event: any): void {
    const cardNumber = event.target.value;

    const cardPatterns: { [key: string]: RegExp } = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      dinersclub: /^3(?:0[0-5]|6|8)/,
    };

    let cardType = 'unknown';

    for (const type in cardPatterns) {
      if (cardPatterns[type].test(cardNumber)) {
        cardType = type;
        break;
      }
    }
    // Mostrar el icono correspondiente y ocultar los demás
    const cardIcons = document.getElementById('card-icons');
    if (cardIcons) {
      const allIcons = cardIcons.getElementsByTagName('img');
      for (let i = 0; i < allIcons.length; i++) {
        const icon = allIcons[i];
        if (icon.id === cardType + '-icon') {
          icon.style.display = 'inline';
        } else {
          icon.style.display = 'none';
        }
      }
    }
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userData) => {
        this.userData = userData;
        this.isLoggedIn = userData !== null;
        console.log(this.userData['id']);

      },
      (error) => {
        console.error('Error al obtener el usuario actual', error);
      }
    );

  }

  closeBuyModal() {
    this.modalService.closeBuyModal();
  }
}
