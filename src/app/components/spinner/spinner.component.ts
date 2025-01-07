import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { getLoadingState } from '../../stores/app.selector';

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
