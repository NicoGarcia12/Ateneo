import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../../components/header/header.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [HeaderModule],
  exports: [LandingComponent],
})
export class LandingModule {}
