import { Component, Input } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { getSnackBarState } from '../../stores/app.selector';
import { snackBar } from '../../stores/app.action';
import { SnackBar } from '../../ts/global.types';

@Component({
  selector: 'snack-bar',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss',
})
export class SnackBarComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  duration: number = 5 * 1000;

  @Input() snackBarDetail: SnackBar | null = null;

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(getSnackBarState)
      .subscribe((snackBarDetail: SnackBar | null) => {
        this.snackBarDetail = snackBarDetail;
        if (snackBarDetail) {
          this.openSnackBar();
        }
      });
  }

  openSnackBar() {
    this._snackBar
      .open(this.snackBarDetail.message, 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.duration,
      })
      .afterDismissed()
      .subscribe(() => {
        this.store.dispatch(snackBar(null));
      });
  }
}
