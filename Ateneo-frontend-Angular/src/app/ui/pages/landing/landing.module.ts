import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../../components/header/header.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [LandingComponent],
    imports: [HeaderModule, MatCardModule, MatIconModule],
    exports: [LandingComponent]
})
export class LandingModule {}
