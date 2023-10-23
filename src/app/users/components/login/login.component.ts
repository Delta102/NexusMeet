import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {


  username: string = '';
  password: string = '';
  errorMessage: string = '';
  message: string = '';


  constructor(private userService: UserService, private modalService: ModalCommunicationService, private router: Router) {}

  closeModal() {
    this.modalService.closeLoginModal(); // Cierra el modal
  }


  async onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        // Manejar el inicio de sesión exitoso
        console.log('Inicio de sesión exitoso', response);
        this.message = 'Inicio de sesión exitoso';

        setTimeout(() => {
          this.router.navigate(['']);
        }, 700);
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
        this.errorMessage = 'Credenciales inválidas';
      }
    );
  }
}
