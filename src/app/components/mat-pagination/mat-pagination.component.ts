import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'mat-pagination',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './mat-pagination.component.html',
  styleUrl: './mat-pagination.component.scss',
})
export class MatPaginationComponent {
  @Input() pageOptions: number[] = [5, 10, 50, 100];
  @Input() pageSize: number | undefined;
  @Input() currentPage: number | undefined;
  @Input() length: number | undefined;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() onPaginationChange: EventEmitter<number> = new EventEmitter();

  paginationChanges(event: any) {
    this.onPaginationChange.emit(event);
  }

  changePageSize(event: any) {
    this.onPageSizeChange.emit(+event.target.value);
  }

  changePage(page: number) {
    this.onPageChange.emit(+page);
  }
}
