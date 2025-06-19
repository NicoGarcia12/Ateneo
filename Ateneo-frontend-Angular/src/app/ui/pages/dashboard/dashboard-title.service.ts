import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardTitleService {
    public title$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setTitle(title: string) {
        this.title$.next(title);
    }
}
