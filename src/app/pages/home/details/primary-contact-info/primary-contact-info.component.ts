import { Component, Input } from '@angular/core';

@Component({
  selector: 'primary-contact-info',
  standalone: true,
  imports: [],
  templateUrl: './primary-contact-info.component.html',
  styleUrl: './primary-contact-info.component.scss',
})
export class PrimaryContactInfoComponent {
  @Input() userForm: any;
}
