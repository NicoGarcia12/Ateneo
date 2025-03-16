import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SectionService {
    public dashboardSection: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private router: Router) {
        this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
            const isDashboard = event.urlAfterRedirects.includes('/dashboard');
            this.dashboardSection.next(isDashboard);
        });
    }
}
