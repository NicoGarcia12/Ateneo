import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { SubjectDetailsComponent } from './subject-details.component';

@NgModule({
    imports: [CommonModule, MatTableModule],
    exports: [SubjectDetailsComponent],
    declarations: [SubjectDetailsComponent]
})
export class SubjectDetailsModule {}
