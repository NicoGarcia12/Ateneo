import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './services/token.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {}

    public canActivate(): Observable<boolean> {
        return this.tokenService.professor$.pipe(
            map((professor) => {
                if (professor) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
