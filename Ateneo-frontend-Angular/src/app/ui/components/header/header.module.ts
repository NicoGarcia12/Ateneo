import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MatButtonModule, CommonModule, MatMenuModule, MatIconModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
