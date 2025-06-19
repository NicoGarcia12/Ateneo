import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../../components/header/header.module';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectsModule } from './subjects/subjects.module';
import { SubjectDetailsModule } from './subjects/subject-details/subject-details.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [HeaderModule, RouterOutlet, CommonModule, SubjectsModule, SubjectDetailsModule],
    exports: [DashboardComponent]
})
export class DashboardModule {}
