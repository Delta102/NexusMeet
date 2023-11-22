import { Component } from '@angular/core';
import { ModalCommunicationService } from 'src/app/events/services/visualservices/modal-comunication.service';
import { UserService } from '../../services/user.service';
import { UserData } from '../../interfaces/user-data.interface';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {

  message:string = '';
  errorMessage: string = '';

  constructor(public modalService: ModalCommunicationService, private userService: UserService, private router: Router) {};

  closeModal() {
    this.modalService.closeRegisterModal();
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
    profilePicture: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file['name']); // Verifica si el archivo se selecciona correctamente
    this.userData.profilePicture = file;
    console.log('Archivo seleccionado:', this.userData.profilePicture);
  }


  onSubmit() {
    this.userData.username = this.userData.email;

    let dateOfBirthControl = new FormControl(this.userData.dateOfBirth, [this.ageValidator()]);

    if (dateOfBirthControl.invalid) {
      this.errorMessage = 'Debes ser mayor de 18 años para continuar.';
      return;
    }

    const dateOfBirth = new Date(this.userData.dateOfBirth);
    const formattedDateBirth = `${dateOfBirth.getFullYear()}-${(dateOfBirth.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateOfBirth.getDate().toString().padStart(2, '0')}`;

    const userPromotorData = new FormData();


    userPromotorData.append('id', this.userData.id.toString());
    userPromotorData.append('password', this.userData.password);
    //userPromotorData.append('last_login', formattedDate);
    userPromotorData.append('username', this.userData.username);
    userPromotorData.append('first_name', this.userData.firstName);
    userPromotorData.append('last_name', this.userData.lastName);
    userPromotorData.append('is_staff', 'false');
    userPromotorData.append('email', this.userData.email);
    userPromotorData.append('phone_number', this.userData.phoneNumber);
    userPromotorData.append('user_type', this.userData.userType ? 'Promotor' : 'Usuario');
    userPromotorData.append('address', this.userData.address);
    userPromotorData.append('date_of_birth', formattedDateBirth);
    userPromotorData.append('profile_picture', this.userData.profilePicture);
    userPromotorData.append('is_active', 'true');

    this.userService.addUser(userPromotorData).subscribe((response: any) => {

      console.log('Usuario creado con éxito', response);
      this.message = 'Usuario creado con éxito';

      setTimeout(() =>{
        this.router.navigate(['']);
      }, 5000);

      window.location.reload();
    },
    (error) => {
      console.log('Error', error);
      this.errorMessage = error;
    }

    );
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = new Date(control.value) >= new Date(new Date().setFullYear(new Date().getFullYear() - 18));
      return forbidden ? {'forbiddenAge': {value: control.value}} : null;
    };
  }
  
}
