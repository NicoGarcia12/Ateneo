import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolutionService {
  private screenWidth = new BehaviorSubject<number>(window.innerWidth);

  public constructor() {
    this.detectResolutionChange();
  }

  public get screenWidth$() {
    return this.screenWidth.asObservable();
  }

  private detectResolutionChange() {
    fromEvent(window, 'resize').subscribe(() => {
      this.screenWidth.next(window.innerWidth);
    });
  }
}
