import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'day-of-month',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './day-of-month.component.html',
  styleUrl: './day-of-month.component.scss',
})
export class DayOfMonthComponent {
  @Input() date: any = null;
  @Input() withMonth: number = null;
}
