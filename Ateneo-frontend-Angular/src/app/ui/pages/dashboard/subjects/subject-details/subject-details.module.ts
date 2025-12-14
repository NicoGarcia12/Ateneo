import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SubjectDetailsComponent } from './subject-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmitModule } from '../../../../components/submit/submit.module';
import { AddGradeButtonModule } from 'src/app/ui/pages/dashboard/subjects/subject-details/components/add-grade-button/add-grade-button.module';
import { MatChipsModule } from '@angular/material/chips';
import { AcademicSummaryPanelModule } from './academic-summary-panel/academic-summary-panel.module';
import { ClassDetailsPanelModule } from './class-details-panel/class-details-panel.module';
import { ActionsTableStudentsComponent } from './components/actions-table-students/actions-table-students.component';
import { SubjectDataButtonModule } from './components/subject-data-modal/subject-data-modal.module';

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
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        SubmitModule,
        MatChipsModule,
        AddGradeButtonModule,
        MatIconModule,
        AcademicSummaryPanelModule,
        ClassDetailsPanelModule,
        SubjectDataButtonModule
    ],
    exports: [SubjectDetailsComponent],
    declarations: [SubjectDetailsComponent, ActionsTableStudentsComponent]
})
export class SubjectDetailsModule {}
