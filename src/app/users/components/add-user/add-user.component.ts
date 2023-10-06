import { Component } from '@angular/core';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../interfaces/user-data.interface';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(public modalService: ModalCommunicationService, private userService: UserService) {}

  closeModal() {
    this.modalService.closeRegisterModal(); // Cierra el modal
  }

  userData: UserData = {
    id: 0,
    password: '',
    lastLogin: new Date(''),
    isSuperuser: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    isStaff: false,
    isActive: true,
    dateJoined: new Date(''),
    userType: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: new Date(''),
  };

  onSubmit() {
    this.userData.username = this.userData.email;

    const userPromotorData = {
      id: this.userData.id,
      password: this.userData.password,
      last_login: this.userData.lastLogin, // Convierte la fecha a formato ISO
      //is_superuser: this.userData.isSuperuser,
      username: this.userData.username,
      first_name: this.userData.firstName,
      last_name: this.userData.lastName,
      is_staff: false, // Puedes usar directamente booleanos
      email: this.userData.email,
      phone_number: this.userData.phoneNumber,
      user_type: this.userData.userType ? 'Promotor' : 'Usuario',
      address: this.userData.address,
      date_of_birth: this.userData.dateOfBirth, // Convierte la fecha a formato ISO
      is_active: true, // Puedes usar directamente booleanos
      //date_joined: this.userData.dateJoined // Convierte la fecha a formato ISO
    };

    console.log(userPromotorData);

    this.userService.addUser(userPromotorData).subscribe((response: any) => {
      window.location.reload();
      console.log('Usuario creado con éxito', response);
    });
  }
}
