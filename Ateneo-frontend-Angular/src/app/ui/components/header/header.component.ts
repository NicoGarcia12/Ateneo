import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { OpenDialogService } from '../../shared/services/open-dialog.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ResolutionService } from '../../shared/services/resolution.service';
import { TokenService } from '../../shared/services/token.service';
import { DashboardTitleService } from '../../pages/dashboard/dashboard-title.service';
import { SectionService } from '../../shared/services/section.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public dashboard: boolean = false;
    public isMobile: boolean = false;
    public professorExists: boolean = false;
    public headerTitle: string = 'Dashboard';

    @ViewChild('profileModalTemplate') profileModalTemplate!: TemplateRef<any>;

    public constructor(
        private router: Router,
        private resolutionService: ResolutionService,
        private tokenService: TokenService,
        private dashboardTitleService: DashboardTitleService,
        private sectionService: SectionService,
        private openDialogService: OpenDialogService
    ) {}
    public openProfileModal(): void {
        const dialogRef = this.openDialogService.openDialog({
            title: 'Mi perfil',
            contentTemplate: this.profileModalTemplate,
            primaryButton: {
                show: true,
                text: 'Console',
                disabled: false,
                loading: false
            },
            secondaryButtonText: 'Cerrar'
        });

        dialogRef.componentInstance.onPrimaryButtonClick = () => {
            dialogRef.componentInstance.data.primaryButton.loading = true;
            dialogRef.componentInstance.data.primaryButton.disabled = true;
            setTimeout(() => {
                dialogRef.componentInstance.data.primaryButton.loading = false;
                dialogRef.componentInstance.data.primaryButton.disabled = false;
                console.log('¡Acción completada desde el modal de perfil!');
                setTimeout(() => {
                    dialogRef.close();
                }, 5000);
            }, 5000);
        };
    }

    public ngOnInit(): void {
        this.sectionService.dashboardSection.subscribe((isDashboard) => {
            this.dashboard = isDashboard;
        });

        this.tokenService.professor$.subscribe((professor) => {
            this.professorExists = !!professor;
        });

        this.dashboardTitleService.title$.subscribe((title) => {
            this.headerTitle = title;
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
