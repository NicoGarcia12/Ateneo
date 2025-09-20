import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface ISignUpUseCase {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable({
    providedIn: 'root'
})
export class SignUpUseCase implements useCase<string, ISignUpUseCase> {
    private apiUrl = buildApiUrl('professors', 'sign-up');

    constructor(private httpClient: HttpClient) {}

    execute(params: ISignUpUseCase): Observable<string> {
        return this.httpClient.post<string>(this.apiUrl, params);
    }
}
