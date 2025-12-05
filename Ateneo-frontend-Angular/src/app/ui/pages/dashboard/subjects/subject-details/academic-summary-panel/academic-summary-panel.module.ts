import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AcademicSummaryPanelComponent } from './academic-summary-panel.component';
import { AcademicSummaryPanelViewModelService } from './academic-summary-panel-view-model.service';
import { SubmitModule } from 'src/app/ui/components/submit/submit.module';

@NgModule({
    declarations: [AcademicSummaryPanelComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatChipsModule,
        MatCheckboxModule,
        SubmitModule
    ],
    providers: [AcademicSummaryPanelViewModelService],
    exports: [AcademicSummaryPanelComponent]
})
export class AcademicSummaryPanelModule {}
