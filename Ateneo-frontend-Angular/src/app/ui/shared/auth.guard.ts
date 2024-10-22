import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from '../pages/login/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router
    ) {}

    public canActivate(): boolean {
        this.tokenService.getUserFromToken();

        if (this.tokenService.professor) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    public decodeToken(token: string): any {
        try {
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    }
}
