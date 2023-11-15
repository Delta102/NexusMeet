import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { UserMainComponent } from './components/user-main/user-main.component';
import { EditUserComponent } from './components/profile/edit-user/edit-user.component';
import { ManageEventsComponent } from '../events/components/manage-events/manage-events.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EntryByUserComponent } from './components/profile/entry-by-user/entry-by-user.component';
import { QrComponent } from '../entry/qr/qr.component';

const routes: Routes = [
  {
    path: '',
    component: UserMainComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: AddUserComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'edit', component: EditUserComponent },
          {
            path: 'manage-events/:userId',
            component: ManageEventsComponent,
            children: [
              { path: 'qr', component: QrComponent }
            ],
          },
          { path: 'entrys/:userId', component: EntryByUserComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
