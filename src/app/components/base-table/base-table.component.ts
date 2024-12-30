import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockList } from '../../constants/mockData';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'base-table',
  standalone: true,
  imports: [PaginationComponent, CommonModule],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss',
})
export class BaseTableComponent {
  @Input() list: any[] = mockList;

  @Input() columns: any[] = [
    'name',
    'phoneNumber',
    'primaryAddress',
    'pincode',
    'dateOfBirth',
    'status',
  ];

  @Input() actions: any[] | undefined;
  @Input() currentPage: number | undefined = 0;
  @Input() totalPages: number | undefined = 0;
  @Input() pageSize: number | undefined = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();

  pageChange(page: number): void {
    this.currentPage = page;
  }

  pageSizeChange(pageSize: number): void {
    this.currentPage = pageSize;
  }
}
