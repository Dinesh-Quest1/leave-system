import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../components/formFields/input-field/input-field.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'basic-info',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
  @Input() userForm: any;
}
