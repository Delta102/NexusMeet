import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  username: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private userService: UserService, private modalService: ModalCommunicationService, private router: Router) {}

  closeModal() {
    this.modalService.closeLoginModal(); // Cierra el modal
  }


  async onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        // Manejar el inicio de sesión exitoso
        console.log('Inicio de sesión exitoso', response);
        window.location.reload();

      },
      (error) => {
        // Manejar el error de inicio de sesión
        console.error('Error de inicio de sesión', error);
        this.errorMessage = 'Credenciales inválidas'; // Mostrar un mensaje de error al usuario
      }
    );
  }
}
