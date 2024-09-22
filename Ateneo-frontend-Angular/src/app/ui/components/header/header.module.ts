import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MatButtonModule, CommonModule, MatMenuModule, MatIconModule, MatSnackBarModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
