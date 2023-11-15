import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalCommunicationService {
  public isLoginModalOpen = false;
  public isAssistantModalOpen = false;
  public isAttendeeModalOpen = false;
  public isRegisterModalOpen = false;
  public isRegisterEventModalOpen = false;
  public isUpdateEventModalOpen = false;
  public isDeleteEventModalOpen = false;
  public isBuyEntryModalOpen = false;

  openBuyModal() {
    this.isBuyEntryModalOpen = true;
  }

  closeBuyModal() {
    this.isBuyEntryModalOpen = false;
  }

  openLoginModal() {
    this.isLoginModalOpen = true;
  }

  closeLoginModal() {
    this.isLoginModalOpen = false;
  }

  openRegisterModal() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterModalOpen = false;
  }

  openAssistantEventModal() {
    this.isAssistantModalOpen = true;
  }

  closeAssistantEventModal() {
    this.isAssistantModalOpen = false;
  }

  openAttendeeEventModal() {
    this.isAttendeeModalOpen = true;
  }

  closeAttendeeModal() {
    this.isAttendeeModalOpen = false;
  }

  openRegisterEventModal() {
    this.isRegisterEventModalOpen = true;
  }

  closeRegisterEventModal() {
    this.isRegisterEventModalOpen = false;
  }
  openUpdateEventModal() {
    this.isUpdateEventModalOpen = true;
  }

  closeUpdateEventModal() {
    this.isUpdateEventModalOpen = false;
  }
  openDeleteEventModal() {
    this.isDeleteEventModalOpen = true;
  }

  closeDeleteEventModal() {
    this.isDeleteEventModalOpen = false;
  }
}
