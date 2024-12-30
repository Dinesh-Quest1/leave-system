import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'mat-base-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './mat-base-table.component.html',
  styleUrl: './mat-base-table.component.scss',
})
export class MatBaseTableComponent implements OnInit {
  displayedColumns: any = ['name'];
  @Input() tableData: any | undefined;

  dataSource!: MatTableDataSource<any>;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges() {
    if (this.tableData) {
      this.dataSource = new MatTableDataSource(this.tableData);
    }
  }
}
