import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number | undefined = 0;
  @Input() totalPages: number | undefined = 0;
  @Input() pageSize: number | undefined = 0;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();

  changePageSize(event: any) {
    this.onPageSizeChange.emit(+event.target.value);
  }

  changePage(page: number) {
    this.onPageChange.emit(+page);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      console.log('Input changed to:', changes['currentPage'].currentValue);
    }
    if (changes['currentPage']) {
      this.onPageChange.emit(this.currentPage);
    }
  }
}
