import { Routes } from '@angular/router';
import { UsersList } from './pages/home/list/list.component';
import { UserDetails } from './pages/home/details/details.component';
import { LeavesComponent } from './pages/leaves/leaves/leaves.component';
import { LeaveDetailsComponent } from './pages/leaves/leave-details/leave-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    component: UsersList,
  },
  {
    path: 'users/details',
    component: UserDetails,
  },
  {
    path: 'leaves',
    component: LeavesComponent,
  },
  {
    path: 'leaves/details',
    component: LeaveDetailsComponent,
  },
  { path: '**', component: NotFoundComponent },
];
