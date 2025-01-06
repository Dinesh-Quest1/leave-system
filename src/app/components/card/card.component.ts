import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConvertDaysPipe } from '../../pipes/convert-days.pipe';

@Component({
  selector: 'leave-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ConvertDaysPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() leaveDetail: any;
  @Input() users: any;
}
