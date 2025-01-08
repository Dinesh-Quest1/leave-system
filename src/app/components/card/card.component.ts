import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ConvertDaysPipe } from '../../pipes/convert-days.pipe';
import { Leave } from '../../ts/Leave.types';
import { User, UsersById } from '../../ts/User.types';

@Component({
  selector: 'leave-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ConvertDaysPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() leaveDetail: Leave;
  @Input() users: UsersById;
}
