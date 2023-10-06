import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/users/interfaces/user-data.interface';
import { UserService } from 'src/app/users/services/user.service';
import { ModalCommunicationService } from '../../services/visualservices/modal-comunication.service';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data.interface';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css']
})
export class ManageEventsComponent {
  logoBlack = '/assets/images/logo/full_logo_black.png';

  eventos: EventData[] = [];
  isLoggedIn = false;
  isPromotor = false;
  userData!: any;

  constructor(private route: ActivatedRoute, private userService: UserService, public modalService: ModalCommunicationService, private eventService: EventService) {}

  ngOnInit(): void {
    let userId: number; // Declarar userId fuera de la función subscribe

    this.route.params.subscribe(async (params) => {
      userId = +params['userId']; // Convierte el parámetro userId a un número

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

      if (!isNaN(userId)) {
        // Verifica que userId sea un número válido
        try {
          this.userData = await this.userService.getUser(userId); // Llama al servicio para obtener los datos del usuario
          console.log(this.userData);

          // Luego, aquí puedes llamar al servicio de eventos con userId
          this.eventService.getEventsByUser(userId)
            .then(eventos => {
              this.eventos = eventos;
              console.log(eventos);
            })
            .catch(error => {
              console.error('Error al obtener eventos del usuario:', error);
            });
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
  }

  deleteEvent(eventId: number): void{
    this.eventService.deleteEvent(eventId)
    .subscribe(
      () => {
        console.log("Evento eliminado con éxito");
        window.location.reload();

      }, error => {
        console.error('Error al eliminar el evento: ', error);
      }
    )
  }

  openRegisterModal() {
    this.modalService.openRegisterEventModal();
  }

  // Cierra el modal de Iniciar Sesión
  closeRegisterModal() {
    this.modalService.closeRegisterEventModal();
  }

  openUpdateModal() {
    this.modalService.openUpdateEventModal();
  }

  // Cierra el modal de Registrar Usuario
  closeUpdateModal() {
    this.modalService.closeUpdateEventModal();
  }

  openDeleteModal() {
    this.modalService.openDeleteEventModal();
  }

  // Cierra el modal de Registrar Usuario
  closeDeleteModal() {
    this.modalService.closeDeleteEventModal();
  }



}
