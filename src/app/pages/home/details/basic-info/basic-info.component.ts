import { Component } from '@angular/core';
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
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  onSubmit(values: any) {
    console.log(values);
  }
}
