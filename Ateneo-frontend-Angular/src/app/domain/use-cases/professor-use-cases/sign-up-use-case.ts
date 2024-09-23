import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface ISignUpUseCase {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable({
    providedIn: 'root'
})
export class SignUpUseCase implements useCase<any, ISignUpUseCase> {
    private apiUrl = 'http://localhost:3001/professors/sign-up';

    constructor(private httpClient: HttpClient) {}

    execute(params: ISignUpUseCase): Observable<any> {
        return this.httpClient.post<string>(this.apiUrl, params);
    }
}
