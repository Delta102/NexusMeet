import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalCommunicationService {
  public isLoginModalOpen = false; // Variable para controlar el modal de Iniciar Sesión
  public isRegisterModalOpen = false; // Variable para controlar el modal de Registrar Usuario
  public isRegisterEventModalOpen = false;
  public isUpdateEventModalOpen = false;
  public isDeleteEventModalOpen = false;

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
