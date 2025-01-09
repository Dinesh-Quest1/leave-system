import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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

  @Output() onPaginationChange: EventEmitter<PageEvent> = new EventEmitter();
}
