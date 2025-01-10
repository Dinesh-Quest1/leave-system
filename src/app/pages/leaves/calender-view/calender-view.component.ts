import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { getAllDatesOfMonth, getMonthAsString } from '../../../utils/leaves';
import { MonthSelectorComponent } from '../../../components/formFields/month-selector/month-selector.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { DayOfMonthComponent } from '../../../components/day-of-month/day-of-month.component';
import { weekDays } from '../../../constants/leaves';

@Component({
  selector: 'app-calender-view',
  standalone: true,
  imports: [
    MatIconModule,
    MonthSelectorComponent,
    MatGridListModule,
    CommonModule,
    DayOfMonthComponent,
  ],
  templateUrl: './calender-view.component.html',
  styleUrl: './calender-view.component.scss',
})
export class CalenderViewComponent {
  constructor() {}
  currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  datesOfMonth: any[] = [];
  currentMonthName: string = '';
  weekDays: string[] = weekDays;

  ngOnInit() {
    this.datesOfMonth = getAllDatesOfMonth(this.currentMonth);
    this.currentMonthName = getMonthAsString(this.currentMonth);
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
