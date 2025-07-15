import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResolutionService } from '../../shared/services/resolution.service';

@Component({
    selector: 'app-modal-dialog',
    templateUrl: './modal-dialog.component.html',
    styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements AfterViewInit {
    public constructor(
        public dialogRef: MatDialogRef<ModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private resolutionService: ResolutionService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    public onPrimaryButtonClick(): void {
        this.dialogRef.close('PRIMARY');
    }

    public onSecondaryButtonClick(): void {
        this.dialogRef.close('SECONDARY');
    }

    public ngAfterViewInit(): void {
        this.resolutionService.checkSizeScreen(window.innerWidth);
        this.changeDetectorRef.detectChanges();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(event: any): void {
        this.resolutionService.checkSizeScreen(event.target.innerWidth);
    }
}
