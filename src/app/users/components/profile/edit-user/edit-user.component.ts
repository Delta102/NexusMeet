import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/users/interfaces/user-data.interface';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
  ]
})
export class EditUserComponent {
  id!: number;
  userData!: UserData | null;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userService.getCurrentUser().subscribe(
      (userData) => {
        this.userData = userData;
      },
      (error) => {
        console.error('Error al obtener el usuario actual', error);
      }
    );
  }

  updateUser(){
    console.log(this.userData!.id);

    this.userService.updateUser(this.userData!.id, this.userData!).subscribe(
      
    );
  }


}
