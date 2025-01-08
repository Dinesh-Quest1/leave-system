import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'switch',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Input() label: string = '';
  @Input() control: FormControl<any> | null = null;
  @Input() name: string = '';
  @Input() checked: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    if (this.readonly || this.disabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable();
    }
  }
}
