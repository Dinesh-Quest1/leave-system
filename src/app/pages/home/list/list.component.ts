import { Component, inject, Inject } from '@angular/core';
import { mockList } from '../../../constants/mockData';
import { CommonModule, formatPercent, UpperCasePipe } from '@angular/common';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { BaseTableComponent } from '../../../components/base-table/base-table.component';
import { MatBaseTableComponent } from '../../../components/mat-base-table/mat-base-table.component';
import { MatPaginationComponent } from '../../../components/mat-pagination/mat-pagination.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../components/modal/modal.component';

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
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=edit&user=' + item?.id);
        },
      },
      {
        header: 'view',
        icon: 'view',
        label: 'View',
        action: (item: any, router: Router) => {
          router.navigateByUrl('/users/details?action=view&user=' + item?.id);
        },
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
  imports: [
    CommonModule,
    BaseTableComponent,
    MatBaseTableComponent,
    MatPaginationComponent,
    ModalComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class UsersList {
  displayedColumns: any[] = columns;
  list: any[] = mockList;
  totalPages = 5;
  currentPage = 1;
  pageSize = 5;
  columns: any[] = columns;
  length: number = 100;
  deleteId: any;

  constructor(private router: Router) {}

  pageChange(page: number): void {
    this.currentPage = page;
  }

  pageSizeChange(pageSize: number): void {
    this.currentPage = pageSize;
  }

  handleRowAction({ action, element, actionType }: any): void {
    if (actionType === 'delete') {
      this.deleteId = element?.id;

      return;
    }
    action(element, this.router);
  }
}
