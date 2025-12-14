import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../components/modal-dialog/modal-dialog.component';
import { DialogDataInterface } from '../../components/modal-dialog/dialog-data';

@Injectable({
    providedIn: 'root'
})
export class OpenDialogService {
    public constructor(public dialog: MatDialog) {}

    public openDialog(data: DialogDataInterface): MatDialogRef<ModalDialogComponent> {
        const dialogRef: MatDialogRef<ModalDialogComponent> = this.dialog.open(ModalDialogComponent, {
            data,
            maxHeight: '90vh'
        });

        return dialogRef;
    }
}
