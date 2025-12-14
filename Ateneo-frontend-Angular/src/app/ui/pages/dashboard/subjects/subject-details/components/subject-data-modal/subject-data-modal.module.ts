import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectDataButtonComponent } from './subject-data-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [SubjectDataButtonComponent],
    imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule],
    exports: [SubjectDataButtonComponent]
})
export class SubjectDataButtonModule {}
