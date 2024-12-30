import { Routes } from '@angular/router';
import { UsersList } from './pages/home/list/list.component';
import { UserDetails } from './pages/home/details/details.component';
import { LeavesComponent } from './pages/leaves/leaves/leaves.component';
import { LeaveDetailsComponent } from './pages/leaves/leave-details/leave-details.component';

export const routes: Routes = [
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
];
