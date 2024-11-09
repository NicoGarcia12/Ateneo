import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface ILoginUseCase {
    email: string;
    password: string;
}

interface ILoginResponse {
    token: string;
    professor: Professor;
}

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase implements useCase<ILoginResponse, ILoginUseCase> {
    private apiUrl = 'http://localhost:3001/professors/login';

    constructor(private httpClient: HttpClient) {}

    execute(params: ILoginUseCase): Observable<ILoginResponse> {
        return this.httpClient.post<ILoginResponse>(this.apiUrl, params);
    }
}
