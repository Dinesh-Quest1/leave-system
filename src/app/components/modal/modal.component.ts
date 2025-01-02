import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title: string = 'Sure ?';
  @Input() content: string = 'This is a modal content.';
  @Output() onConfirm: EventEmitter<string> = new EventEmitter();
  @Output() onDismiss: EventEmitter<void> = new EventEmitter();

  confirm(): void {
    this.onConfirm.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['title']) {
      console.log('Input changed to:', changes['title'].currentValue);

      if (changes['title'].currentValue) {
        // this.openDialog();
      }
      if (!changes['title'].currentValue) {
        this.dialogRef.close();
      }
    }
  }

  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}
  dismiss(): void {
    this.dialogRef.close();
  }
}
