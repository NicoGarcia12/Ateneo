import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
