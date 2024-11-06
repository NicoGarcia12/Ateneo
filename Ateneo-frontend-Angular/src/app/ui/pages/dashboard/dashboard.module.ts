import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../../components/header/header.module';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectsModule } from './subjects/subjects.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [HeaderModule, RouterOutlet, CommonModule, SubjectsModule],
    exports: [DashboardComponent]
})
export class DashboardModule {}
