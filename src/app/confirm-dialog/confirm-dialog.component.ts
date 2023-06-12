import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  // template: `
  //   <h2 mat-dialog-title>{{ data.message }} </h2>
  //   <div mat-dialog-actions>
  //     <button mat-button (click)="onCancelClick()">{{ data.cancelText }}</button>
  //     <button mat-button color="warn" (click)="onConfirmClick()">{{ data.confirmText }}</button>
  //   </div>
  // `,
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    // @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ){}

  confirm(): void{
    this.dialogRef.close(true);
  }

  cancel(): void{
    this.dialogRef.close(false);
  }
  // onCancelClick(): void{
  //   this.dialogRef.close();
  // }

  // onConfirmClick(): void{
  //   this.dialogRef.close('confirm');
  // }
}


// export interface ConfirmDialogData{
//   message: string;
//   confirmText: string;
//   cancelText: string;
// }
