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
    this.modalService.closeLoginModal();
  }


  onSubmit() {
    this.userService.login(this.username, this.password).subscribe((success: boolean) => {
      if (success) {
        this.message = 'Inicio de sesión exitoso';
        setTimeout(() => {
          this.router.navigate(['']);
        }, 1200);
      } else {
        this.errorMessage = 'Error en el inicio de sesión';
      }
    });
  }
}
