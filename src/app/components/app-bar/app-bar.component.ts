import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  navItems = [
    { name: 'Home', navigateTo: '/users' },
    { name: 'Leaves', navigateTo: '/leaves' },
  ];

  onClick(item: { name: string; navigateTo: string }) {
    console.log(item.name);
  }
}
