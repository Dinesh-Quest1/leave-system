import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Input() control: any = null;
  @Input() name: string = '';
  @Input() checked: boolean = false;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
}
