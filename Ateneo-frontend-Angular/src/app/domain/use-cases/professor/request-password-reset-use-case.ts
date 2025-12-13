import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IRequestPasswordResetUseCase {
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class RequestPasswordResetUseCase implements useCase<IResponse, IRequestPasswordResetUseCase> {
    private apiUrl = buildApiUrl('professors', 'request-password-reset');

    constructor(private httpClient: HttpClient) {}

    execute(params: IRequestPasswordResetUseCase): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.apiUrl, params);
    }
}
