import { Component } from '@angular/core';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';
import { UsersList } from '../home/list/list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [AppBarComponent, UsersList, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
