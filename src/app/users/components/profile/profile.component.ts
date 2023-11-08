import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserData } from '../../interfaces/user-data.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent {
  userData!: UserData | null;
  isLoggedIn: boolean = false;
  hasLoaded: boolean = false;
  isPromotor: boolean = false;

  constructor(private userService: UserService) {
    this.userService.getCurrentUser().subscribe(
      (userData) => {
        this.userData = userData;
        this.isLoggedIn = userData !== null;
        if (userData && userData['userType']) {
          console.log(userData['userType']);
        } else {
          console.log('userData o userData.user_type es nulo');
        }

        this.isPromotor = userData!['userType'] === 'Promotor';
      },
      (error) => {
        console.error('Error al obtener el usuario actual', error);
      }
    );
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 200);
  }
}
