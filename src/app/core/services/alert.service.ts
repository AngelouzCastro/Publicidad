import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  toast(message: string, action: string = 'Cerrar', duration: number = 3000) {
    this.snackBar.open(message, action, { duration });
  }

  confirm(message: string, title: string = 'Confirmar'): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message, title },
    });
    return dialogRef.afterClosed();
  }
}