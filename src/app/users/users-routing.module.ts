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
import { AssistantComponent } from '../entry/assistant/assistant.component';
import { ListAssistsComponent } from '../entry/list-assists/list-assists.component';

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
              // { path: 'qr', component: QrComponent },
              { path: 'assistant/:eventId', component: AssistantComponent }
            ],
          },
          { path: 'entrys/:userId', component: EntryByUserComponent },
          { path: 'all_assistants/:userId', component: ListAssistsComponent },
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
