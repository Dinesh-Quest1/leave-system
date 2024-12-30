import { Component } from '@angular/core';
import { mockList } from '../../../constants/mockData';
import { CommonModule, formatPercent, UpperCasePipe } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';

const columns = [
  {
    header: 'Name',
    field: 'name',
  },
  {
    header: 'Phone Number',
    field: 'phoneNumber',
  },
  {
    header: 'Primary Address',
    field: 'primaryAddress',
  },
  {
    header: 'Pincode',
    field: 'pincode',
  },
  {
    header: 'Date of Birth',
    field: 'dateOfBirth',
  },
  {
    header: 'Status',
    field: 'status',
    format: (data: any) => (data ? 'Active' : 'Inactive'),
  },
  {
    header: 'Actions',
    field: 'actions',
    actions: [
      {
        header: 'edit',
        icon: 'edit',
        label: 'Edit',
        action: (item: any) => console.log('Edit clicked', item),
      },
      {
        header: 'view',
        icon: 'view',
        label: 'View',
        action: (item: any) => console.log('view clicked', item),
      },
      {
        header: 'delete',
        icon: 'delete',
        label: 'Delete',
        action: (item: any) => console.log('Delete clicked', item),
      },
    ],
  },
];

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, BaseTableComponent, MatBaseTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class UsersList {
  list: any[] = mockList;
  totalPages = 5;
  currentPage = 1;
  columns: any[] = columns;

  pageChange(page: number): void {
    this.currentPage = page;
  }

  pageSizeChange(pageSize: number): void {
    this.currentPage = pageSize;
  }
}
