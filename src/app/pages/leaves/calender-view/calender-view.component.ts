import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  getAllDatesOfMonth,
  getLeavesByDate,
  getMonthAsString,
} from '../../../utils/leaves';
import { MonthSelectorComponent } from '../../../components/formFields/month-selector/month-selector.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { DayOfMonthComponent } from '../../../components/day-of-month/day-of-month.component';
import { weekDays } from '../../../constants/leaves';
import { Leave } from '../../../ts/Leave.types';
import { User } from '../../../ts/User.types';
import { Store } from '@ngrx/store';
import { getLeaves, getUsers } from '../../../stores/app.selector';
import { GroupArrayByKeyPipe } from '../../../pipes/group-array-by-key.pipe';

@Component({
  selector: 'app-calender-view',
  standalone: true,
  imports: [
    MatIconModule,
    MonthSelectorComponent,
    MatGridListModule,
    CommonModule,
    DayOfMonthComponent,
    GroupArrayByKeyPipe,
  ],
  templateUrl: './calender-view.component.html',
  styleUrl: './calender-view.component.scss',
})
export class CalenderViewComponent {
  list: Leave[] = [];
  groupedLeaves: any[] = [];
  users: User[] = [];
  constructor() {}
  currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  datesOfMonth: any[] = [];
  currentMonthName: string = '';
  weekDays: string[] = weekDays;

  store: Store = inject(Store);
  ngOnInit() {
    this.datesOfMonth = getAllDatesOfMonth(this.currentMonth);
    this.currentMonthName = getMonthAsString(this.currentMonth);

    this.store.select(getLeaves).subscribe((value: Leave[]) => {
      this.list = value;
      this.groupedLeaves = getLeavesByDate(this.list);

      console.log(this.groupedLeaves, 'groupedLeaves');
    });
    this.store.select(getUsers).subscribe((value: User[]) => {
      this.users = value;
    });
  }

  onMonthChange(changeType: 'forward' | 'back') {
    if (changeType === 'forward') {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() + 1,
        1
      );
      this.datesOfMonth = getAllDatesOfMonth(this.currentMonth);
      this.currentMonthName = getMonthAsString(this.currentMonth);
    }
    if (changeType === 'back') {
      this.currentMonth = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth() - 1,
        1
      );
      this.datesOfMonth = getAllDatesOfMonth(this.currentMonth);
      this.currentMonthName = getMonthAsString(this.currentMonth);
    }
  }
}
