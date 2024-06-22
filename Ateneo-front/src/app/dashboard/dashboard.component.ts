import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarDashboardComponent } from "../navbars/navbar-dashboard/navbar-dashboard.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [RouterOutlet, NavbarDashboardComponent]
})
export class DashboardComponent {

}
