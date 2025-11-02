import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SubjectDetailsComponent } from './subject-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmitModule } from '../../../../components/submit/submit.module';
import { AddGradeButtonModule } from 'src/app/ui/pages/dashboard/subjects/subject-details/components/add-grade-button/add-grade-button.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        SubmitModule,
        MatChipsModule,
        AddGradeButtonModule,
        MatIconModule
    ],
    exports: [SubjectDetailsComponent],
    declarations: [SubjectDetailsComponent]
})
export class SubjectDetailsModule {}
