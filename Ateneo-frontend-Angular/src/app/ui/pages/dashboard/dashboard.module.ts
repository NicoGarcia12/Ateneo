import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [HeaderModule],
    exports: [DashboardComponent]
})
export class DashboardModule {}
