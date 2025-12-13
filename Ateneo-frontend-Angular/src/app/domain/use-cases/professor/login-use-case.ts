import { HttpClient } from '@angular/common/http';
import { Professor } from '../../entities/professor';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface ILoginUseCase {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class LoginUseCase implements useCase<IResponse, ILoginUseCase> {
    private readonly BASE_URL = buildApiUrl('professors');
    private urlLogin = `${this.BASE_URL}/login`;

    constructor(private httpClient: HttpClient) {}

    execute(params: ILoginUseCase): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.urlLogin, params);
    }
}
