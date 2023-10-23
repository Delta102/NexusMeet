import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsByUserComponent } from './components/events-by-user/events-by-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { UserMainComponent } from './components/user-main/user-main.component';

const routes: Routes = [
  {path: '', component: UserMainComponent, children:[
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class UsersRoutingModule {}
