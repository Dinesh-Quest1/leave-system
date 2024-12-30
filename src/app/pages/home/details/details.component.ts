import { Component } from '@angular/core';
import { DetailsHeaderComponent } from '../../../components/details-header/details-header.component';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [DetailsHeaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class UserDetails {}
