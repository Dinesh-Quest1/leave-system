import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'details-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-header.component.html',
  styleUrl: './details-header.component.scss',
})
export class DetailsHeaderComponent {
  @Input() renderTemplate: any = null;
}
