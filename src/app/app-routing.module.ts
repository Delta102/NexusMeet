import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/pages/home/main.component';
import { LoginComponent } from './users/components/login/login.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },

  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsModule ),
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
