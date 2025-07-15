import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SubmitModule } from '../submit/submit.module';

@NgModule({
    declarations: [ModalDialogComponent],
    exports: [ModalDialogComponent],
    imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule, SubmitModule]
})
export class ModalDialogModule {}
