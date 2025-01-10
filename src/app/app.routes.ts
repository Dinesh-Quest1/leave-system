import { Routes } from '@angular/router';
import { UsersList } from './pages/home/list/list.component';
import { UserDetails } from './pages/home/details/details.component';
import { LeavesComponent } from './pages/leaves/leaves/leaves.component';
import { LeaveDetailsComponent } from './pages/leaves/leave-details/leave-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LeaveLayout } from './pages/leaves/index.component';
import { CalenderViewComponent } from './pages/leaves/calender-view/calender-view.component';

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
    path: 'users/details/:user',
    component: UserDetails,
  },
  {
    path: 'leaves',
    component: LeaveLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/leaves/leaves/leaves.component').then(
            (m) => m.LeavesComponent
          ),
        pathMatch: 'full',
      },
      {
        path: 'calender-view',
        loadComponent: () =>
          import('./pages/leaves/calender-view/calender-view.component').then(
            (m) => m.CalenderViewComponent
          ),
      },
    ],
  },
  {
    path: 'leaves/details',
    component: LeaveDetailsComponent,
  },
  {
    path: 'leaves/details/:user',
    component: LeaveDetailsComponent,
  },
  { path: '**', component: NotFoundComponent },
];
