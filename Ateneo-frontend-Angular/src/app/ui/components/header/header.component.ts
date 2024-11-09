import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ResolutionService } from '../../shared/services/resolution.service';
import { TokenService } from '../../shared/services/token.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public dashboard: boolean = false;
    public isMobile: boolean = false;
    public isLanding: boolean = false;
    public professorExists: boolean = false;

    public constructor(
        private router: Router,
        private resolutionService: ResolutionService,
        private tokenService: TokenService
    ) {}

    public ngOnInit(): void {
        this.isLanding = this.router.url === '/';
        this.dashboard = this.router.url.includes('dashboard');

        this.tokenService.professor$.subscribe((professor) => {
            this.professorExists = !!professor;
        });

        this.resolutionService.screenWidth$.subscribe((width) => {
            this.isMobile = width <= 600;
        });
    }

    public toggleSidenav(sidenav: MatSidenav) {
        sidenav.toggle();
    }

    public goTo(url: string): void {
        this.router.navigate([url]);
    }

    public logOut(): void {
        this.tokenService.removeToken();
        this.router.navigate(['login']);
    }
}
