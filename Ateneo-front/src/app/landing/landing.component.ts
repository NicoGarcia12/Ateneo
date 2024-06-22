import { Component } from '@angular/core';
import { NavbarLandingComponent } from "../navbars/navbar-landing/navbar-landing.component";

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.scss',
    imports: [NavbarLandingComponent]
})
export class LandingComponent {

}
