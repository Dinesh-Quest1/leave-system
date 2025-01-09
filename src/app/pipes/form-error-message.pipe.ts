import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formErrorMessage',
  standalone: true,
})
export class FormErrorMessagePipe implements PipeTransform {
  transform(
    control: any,
    label: string,
    error?: string | null,
    ...args: unknown[]
  ): string {
    if (error) return error;
    if (control?.errors?.['required']) return label + ' is required';
    if (control?.errors?.['minlength'])
      return `Minimum length is
      ${control.errors['minlength'].requiredLength} characters.`;
    if (control?.errors?.['maxlength'])
      return `Maximum length is
      ${control.errors['maxlength'].requiredLength} characters.`;
    if (control?.errors?.['email'])
      return 'Please enter a valid email address.';
    return '';
  }
}
