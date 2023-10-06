import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data.interface';
import { ModalCommunicationService } from '../../services/visualservices/modal-comunication.service';
import { UserService } from 'src/app/users/services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main.component.html'
})

export class MainComponent {
  isLoggedIn = false;
  isPromotor = false;
  userData: any;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    public modalService: ModalCommunicationService,
    private router: Router,
    private route: ActivatedRoute,  
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scrollToElement(fragment);
        }
      }
    });
  }

  scrollToElement(fragment: string): void {
    const element = document.querySelector(`#${fragment}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  events: EventData[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.events = await this.eventService.getEvents();
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }

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

  logout() {
    localStorage.removeItem('tokenLogin');
    this.isLoggedIn = false;
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
}
