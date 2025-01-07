import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';

@Component({
  selector: 'check-box',
  standalone: true,
  imports: [
    CommonModule,
    MatPseudoCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './check-box.component.html',
  styleUrl: './check-box.component.scss',
})
export class CheckBoxComponent {
  @Input() label: string = '';
  @Input() control: any;
  @Input() name: string = '';
  @Input() disabled: boolean = false;

  ngOnInit() {
    if (this.disabled) {
      this.control.disable();
    }
  }
}
