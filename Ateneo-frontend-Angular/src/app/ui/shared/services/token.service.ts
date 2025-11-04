import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Professor } from '../../../domain/entities/professor';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'ateneo-clave-token';

    public professorSubject = new BehaviorSubject<Professor | null>(null);
    public professor$: Observable<Professor | null> = this.professorSubject.asObservable();

    constructor(private localStorageService: LocalStorageService) {
        this.getUserFromToken();
    }

    public setToken(token: string): void {
        this.localStorageService.setItem(this.tokenKey, token);
        this.getUserFromToken();
    }

    public getToken(): string | null {
        return this.localStorageService.getItem(this.tokenKey);
    }

    public getUserFromToken(): Professor | null {
        const token = this.getToken();
        if (token && this.isValidJWT(token)) {
            try {
                const professor = jwtDecode<Professor>(token);
                this.professorSubject.next(professor);
            } catch (error) {
                this.removeToken();
                this.professorSubject.next(null);
            }
        } else {
            this.professorSubject.next(null);
        }

        return this.professorSubject.value;
    }

    private isValidJWT(token: string): boolean {
        // Un JWT válido tiene 3 partes separadas por puntos
        const parts = token.split('.');
        return parts.length === 3;
    }

    public removeToken(): void {
        this.localStorageService.removeItem(this.tokenKey);
        this.professorSubject.next(null);
    }
}
