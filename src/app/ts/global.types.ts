import { TemplateRef } from '@angular/core';

export type SnackBar = {
  message: string;
};

export type PageDetails = {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
};

export type TableAction = {
  header: string;
  icon?: string;
  iconColor?: string;
  label?: string;
  action?: Function | string;
};
export type TableColumn = {
  header: string;
  field: string;
  format?: Function;
  actions?: TableAction[];
  templateName?: string;
  template?: TemplateRef<any>;
};
