import { Router } from '@angular/router';
import { User } from '../ts/User.types';
import { TableColumn } from '../ts/global.types';

export const columns: TableColumn[] = [
  {
    header: 'Name',
    field: 'basicInfo',
    format: (data: any) => {
      return data?.firstName + ' ' + data?.lastName || '';
    },
  },
  {
    header: 'Phone Number',
    field: 'basicInfo',
    format: (data: any) => data?.phoneNumber || '',
  },
  {
    header: 'Primary Address',
    field: 'primaryContactInfo',
    format: (data: any) => data?.address || '',
  },
  {
    header: 'Pincode',
    field: 'primaryContactInfo',
    format: (data: any) => data?.pincode || '',
  },
  {
    header: 'Status',
    field: 'primaryContactInfo',
    format: (data: any) => (data?.status ? 'Active' : 'Inactive'),
    templateName: 'statusTemplate',
  },
  {
    header: 'Actions',
    field: 'actions',
    actions: [
      {
        header: 'edit',
        icon: 'edit',
        iconColor: 'primary',
        label: 'Edit',
        action: (item: User, router: Router) => {
          router.navigateByUrl(`/users/details/${item?.id}?action=edit`);
        },
      },
      {
        header: 'view',
        icon: 'visibility',
        iconColor: 'accent',
        label: 'View',
        action: (item: User, router: Router) => {
          router.navigateByUrl(`/users/details/${item?.id}?action=view`);
        },
      },
      {
        header: 'delete',
        icon: 'delete',
        iconColor: 'warn',
        label: 'Delete',
        action: (item: User) => console.log('Delete clicked', item),
      },
    ],
  },
];
