import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardTitleService } from '../../dashboard-title.service';

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrl: './subject-details.component.scss'
})
export class SubjectDetailsComponent implements OnInit {
    public idSubject: string = '';

    public constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dashboardTitleService: DashboardTitleService
    ) {}

    public ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params) => {
            if (params.get('idSubject') === null) {
                this.router.navigate(['/dashboard/subjects']);
            }

            this.idSubject = params.get('idSubject') as string;
        });

        // TODO Tengo que cambiar para que muestre la materia que está, eso lo hago porque la pido al principio y cuando tengo los datos muestro el name
        this.dashboardTitleService.setTitle('Detalles de la materia');
    }
}
