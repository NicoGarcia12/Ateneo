import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IResetPasswordUseCase {
    email: string;
    code: string;
    newPassword: string;
}

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordUseCase implements useCase<IResponse, IResetPasswordUseCase> {
    private apiUrl = buildApiUrl('professors', 'reset-password');

    constructor(private httpClient: HttpClient) {}

    execute(params: IResetPasswordUseCase): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.apiUrl, params);
    }
}
