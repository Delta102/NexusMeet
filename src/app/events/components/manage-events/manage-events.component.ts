import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/users/services/user.service';
import { ModalCommunicationService } from '../../services/visualservices/modal-comunication.service';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data.interface';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.component.html',
  styleUrls: ['./manage-events.component.css'],
  providers: [DatePipe]
})
export class ManageEventsComponent {
  logoBlack = '/assets/images/logo/full_logo_black.png';

  eventData: EventData[] = [];
  isLoggedIn = false;
  isPromotor = false;
  userData!: any;
  selectedFilter = 'todos';
  // isEventsToStartOpen = false;
  // isUpcomingEventsOpen = false;
  // isPastEventsOpen = false;
  eventsToStart: EventData[] = [];
  upcomingEvents: EventData[] = [];
  pastEvents: EventData[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService, public modalService: ModalCommunicationService, private eventService: EventService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    let userId: number;

    this.route.params.subscribe(async (params) => {
      userId = +params['userId'];

      this.userService.getCurrentUser().subscribe(
        (userData) => {
          this.userData = userData;
          this.isLoggedIn = userData !== null;
          if (userData && userData['userType']) {
            console.log(userData['userType']);
          } else {
            console.log("userData o userData.user_type es nulo");
          }

          this.isPromotor =userData!['userType'] === 'Promotor';
        },
        (error) => {
          console.error('Error al obtener el usuario actual', error);
        }
      );

      if (!isNaN(userId)) {
        try {
          this.userData = await this.userService.getUser(userId); // Llama al servicio para obtener los datos del usuario
          this.eventService.getEventsByUser(userId).subscribe(
            (data: EventData[]) => {
              this.eventData = data;
              this.filteredEvents();
            },
            (error) => {
              console.error('Error al obtener los eventos: ', error);

            }
          )
        } catch (error) {
          console.error('Error al obtener el usuario:', error);
        }
      }
    });
  }

  formatFecha(fecha: string): string {
    const fechaDate = new Date(fecha);
    return formatDate(fechaDate, 'yyyy-MM-dd HH:mm:ss', 'en-US', 'GMT-0');
  }


  filteredEvents(){
    const currentDate = new Date();
    const nextDate = new Date(currentDate.getTime() + 10 * 60000);

    const formatDate = (date: any, format: any, locale: any, timeZone: any) => {
      return new Intl.DateTimeFormat(locale, {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(date);
    };

    this.eventData.forEach((event) => {

      const formattedDate = formatDate(
        event.dateEventStart,
        'yyyy-MM-dd HH:mm:ss',
        'en-US',
        'GMT-0'
      );

      event.dateEventStart = new Date(formattedDate);

      console.log(event.dateEventStart);


      if ( event.dateEventStart < currentDate ){
        this.pastEvents.push(event);
      }
      if( event.dateEventStart > currentDate && event.dateEventStart <= nextDate ){
        this.eventsToStart.push(event);
      }
      if( event.dateEventStart > nextDate ){
        this.upcomingEvents.push(event);
      }
    });

  };

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
  };


  openRegisterModal() {
    this.modalService.openRegisterEventModal();
  }

  openAssistentModal() {
    this.modalService.openAssistantEventModal();
  }

  openAttendeeModal(){
    this.modalService.openAttendeeEventModal();
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
