import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ResolutionService {
    private screenWidthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
    public screenWidth$: Observable<number> = this.screenWidthSubject.asObservable();

    public constructor() {
        window.addEventListener('resize', () => {
            this.checkSizeScreen(window.innerWidth);
        });
    }

    public checkSizeScreen(width: number): void {
        this.screenWidthSubject.next(width);
    }

    public isScreenSizeBelow(width: number): boolean {
        return this.screenWidthSubject.getValue() <= width;
    }
}
