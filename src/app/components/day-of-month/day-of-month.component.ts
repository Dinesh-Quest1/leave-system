import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLeaves, getUsers } from '../../stores/app.selector';
import { Leave } from '../../ts/Leave.types';
import { User } from '../../ts/User.types';

@Component({
  selector: 'day-of-month',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './day-of-month.component.html',
  styleUrl: './day-of-month.component.scss',
})
export class DayOfMonthComponent {
  @Input() date: any = null;
  @Input() withMonth: number = null;
  list: Leave[];
  users: User[];
  @Input() leaves: any;

  constructor(private readonly router: Router) {}

  onClick(): void {
    this.router.navigate(['/leaves/details/new'], { state: this.date });
  }

  store: Store = inject(Store);

  ngOnInit() {
    this.store.select(getLeaves).subscribe((value: Leave[]) => {
      this.list = value;
    });
    this.store.select(getUsers).subscribe((value: User[]) => {
      this.users = value;
    });
  }
}
