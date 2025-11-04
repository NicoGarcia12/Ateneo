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

export interface ProfessorResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    emailActivated: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SignUpUseCase implements useCase<ProfessorResponse, ISignUpUseCase> {
    private apiUrl = buildApiUrl('professors', 'sign-up');

    constructor(private httpClient: HttpClient) {}

    execute(params: ISignUpUseCase): Observable<ProfessorResponse> {
        return this.httpClient.post<ProfessorResponse>(this.apiUrl, params);
    }
}
