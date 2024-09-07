import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HeaderComponent],
  imports: [MatButtonModule, CommonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
