import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
  }



  ngOnInit() {
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
    this.userService.logout();
    localStorage.removeItem('tokenJWT');
    this.isLoggedIn = false;
    setTimeout(() => {
      this.router.navigate(['']);
    }, 700);
  }

  onLogoutClick() {
    this.userService.logout();
  }
}
