import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoadingState } from '../../stores/app.selector';
import { stopLoader } from '../../stores/app.action';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  constructor(private readonly store: Store) {}
  @Input() show: boolean = false;

  ngOnInit() {
    this.store.select(getLoadingState).subscribe((loading) => {
      this.show = loading;
    });
  }
}
