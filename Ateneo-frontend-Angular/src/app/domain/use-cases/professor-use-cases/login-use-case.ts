import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface ILoginUseCase {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase implements useCase<Professor, ILoginUseCase> {
    private apiUrl = 'http://localhost:3001/professors'; // Cambia esta URL por la tuya

    constructor(private httpClient: HttpClient) {}

    execute(params: ILoginUseCase): Observable<Professor> {
        return this.httpClient.post<Professor>(this.apiUrl, params);
    }
}
