import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventData } from 'src/app/events/interfaces/event-data.interface';
import { EventService } from 'src/app/events/services/event.service';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  isLoggedIn = false;
  isPromotor = false;
  userData: any;

  constructor(
    public modalService: ModalCommunicationService,
    private userService: UserService,
    private eventService: EventService,
  ) {
  }



  async ngOnInit(): Promise<void> {

    this.userService.getCurrentUser().subscribe(
      (userData) => {
        this.userData = userData;
        this.isLoggedIn = userData !== null;
        if (userData && userData['user_type']) {
          console.log(userData['user_type']);
        } else {
          console.log("userData o userData.user_type es nulo");
        }

        this.isPromotor =userData['user_type'] === 'Promotor';
      },
      (error) => {
        console.error('Error al obtener el usuario actual', error);
      }
    );
  }

  openLoginModal() {
    this.modalService.openLoginModal();

  }

  // Cierra el modal de Iniciar Sesión
  closeLoginModal() {
    this.modalService.closeLoginModal();
  }

  openRegisterModal() {
    this.modalService.openRegisterModal();
  }

  // Cierra el modal de Registrar Usuario
  closeRegisterModal() {
    this.modalService.closeRegisterModal();
  }

  logout() {
    localStorage.removeItem('tokenLogin');
    this.isLoggedIn = false;
  }

  onLogoutClick() {
    this.userService.logout().subscribe(
      () => {
        // Realizar acciones adicionales después del logout si es necesario
        console.log('Logout exitoso');
        // Redirigir al usuario a la página de inicio o a otra página deseada
      },
      (error) => {
        console.error('Error al hacer logout', error);
      }
    );
  }
}
