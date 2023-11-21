import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserData } from '../../interfaces/user-data.interface';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit{
  userData!: UserData | null;
  isLoggedIn: boolean = false;
  hasLoaded: boolean = false;
  isPromotor: boolean = false;
  showImage: boolean = true;

  constructor(private userService: UserService, private router: Router) {
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

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showImage = this.router.url === 'user/profile';
        console.log(this.showImage);
        
      }
    });
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 200);
  }
}
