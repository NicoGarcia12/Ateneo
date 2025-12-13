import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IVerifyResetCodeUseCase {
    email: string;
    code: string;
}

@Injectable({
    providedIn: 'root'
})
export class VerifyResetCodeUseCase implements useCase<IResponse, IVerifyResetCodeUseCase> {
    private readonly BASE_URL = buildApiUrl('professors');
    private urlVerifyResetCode = `${this.BASE_URL}/verify-reset-code`;

    constructor(private httpClient: HttpClient) {}

    execute(params: IVerifyResetCodeUseCase): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.urlVerifyResetCode, params);
    }
}
