import { NgModule } from '@angular/core';
import { SubmitComponent } from './submit.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [SubmitComponent],
    imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
    exports: [SubmitComponent]
})
export class SubmitModule {}
