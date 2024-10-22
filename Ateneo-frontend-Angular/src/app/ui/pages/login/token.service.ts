import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Professor } from '../../../domain/entities/professor';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private tokenKey = 'ateneo-clave-token';

    public professor: Professor | null = null;

    constructor(private localStorageService: LocalStorageService) {}

    public setToken(token: string): void {
        this.localStorageService.setItem(this.tokenKey, token);
    }

    public getToken(): string | null {
        return this.localStorageService.getItem(this.tokenKey);
    }

    public getUserFromToken(): any {
        const token = this.getToken();
        if (token) {
            this.professor = jwtDecode(token);
            return;
        }
        this.professor = null;
    }

    public removeToken(): void {
        this.localStorageService.removeItem(this.tokenKey);
    }

    public hasToken(): boolean {
        return this.getToken() !== null;
    }
}
