import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface ISignUpUseCase {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable({
    providedIn: 'root'
})
export class SignUpUseCase implements useCase<IResponse, ISignUpUseCase> {
    private readonly BASE_URL = buildApiUrl('professors');
    private urlSignUp = `${this.BASE_URL}/sign-up`;

    constructor(private httpClient: HttpClient) {}

    execute(params: ISignUpUseCase): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.urlSignUp, params);
    }
}
