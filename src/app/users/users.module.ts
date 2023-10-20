import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    LoginComponent,
    AddUserComponent
  ],

  imports: [
    FormsModule
  ],
  providers: [
  ],

  exports: [
    LoginComponent,
    AddUserComponent
  ],
})
export class UsersModule { }
