import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SubjectDetailsComponent } from './subject-details.component';

@NgModule({
    imports: [CommonModule, MatTableModule, MatDatepickerModule, MatNativeDateModule],
    exports: [SubjectDetailsComponent],
    declarations: [SubjectDetailsComponent]
})
export class SubjectDetailsModule {}
