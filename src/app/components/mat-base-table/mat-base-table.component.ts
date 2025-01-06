import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginationComponent } from '../mat-pagination/mat-pagination.component';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'mat-base-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginationComponent,
    ModalComponent,
    MatIconModule,
  ],
  templateUrl: './mat-base-table.component.html',
  styleUrl: './mat-base-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatBaseTableComponent implements OnInit {
  @Input() displayedColumns: any = [];
  @Input() tableData: any | undefined;

  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Input() length: number = 0;
  @Input() modalContent: string = '';

  @Output() onConfirmModal: EventEmitter<any> = new EventEmitter();
  @Output() onDismissModal: EventEmitter<any> = new EventEmitter();

  @Output() handleRowAction: EventEmitter<any> = new EventEmitter();

  headers: string[] = [];

  onPaginationChange({ pageIndex, pageSize }: any) {
    const dataToRender = this.tableData.slice(
      pageIndex * pageSize,
      pageSize * pageIndex + pageSize
    );
    this.dataSource = new MatTableDataSource(dataToRender);
  }
  dataSource!: MatTableDataSource<any>;

  handleAction(action: Function, element: any, actionType: string) {
    if (actionType === 'delete') {
      this.openDialog();
      return;
    }
    this.handleRowAction.emit({ action, element, actionType });
  }

  ngOnInit() {
    const dataToRender = this.tableData.slice(
      this.currentPage * this.pageSize,
      this.pageSize * this.currentPage + this.pageSize
    );

    this.dataSource = new MatTableDataSource(dataToRender);
    this.headers = this.displayedColumns.map((column: any) => column.header);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      const dataToRender = this.tableData.slice(
        this.currentPage * this.pageSize,
        this.pageSize * this.currentPage + this.pageSize
      );
      this.dataSource = new MatTableDataSource(dataToRender);
    }
    if (this.displayedColumns) {
      this.headers = this.displayedColumns.map((column: any) => column.header);
    }
  }

  confirmOnModal() {
    console.log('Modal confirmed');
  }

  dismissOnModal() {
    console.log('Modal closed');
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { title: 'Example', name: 'Example' },
      hasBackdrop: true,
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }
}
