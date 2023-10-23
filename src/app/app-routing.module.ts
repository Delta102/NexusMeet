import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/pages/home/main.component';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },

  {
    path: 'user',
    loadChildren: () => import('./users/users.module').then( m => m.UsersModule ),
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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
