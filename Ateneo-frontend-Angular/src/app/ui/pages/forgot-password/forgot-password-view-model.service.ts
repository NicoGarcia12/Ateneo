import { Injectable } from '@angular/core';
import { RequestPasswordResetUseCase } from '../../../domain/use-cases/professor/request-password-reset-use-case';
import { VerifyResetCodeUseCase } from '../../../domain/use-cases/professor/verify-reset-code-use-case';
import { Observable } from 'rxjs';
import { IResponse } from '../../../domain/use-cases/use-case.interface';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordViewModelService {
    constructor(
        private requestPasswordResetUseCase: RequestPasswordResetUseCase,
        private verifyResetCodeUseCase: VerifyResetCodeUseCase
    ) {}

    requestReset(email: string): Observable<IResponse> {
        return this.requestPasswordResetUseCase.execute({ email });
    }

    verifyCode(email: string, code: string): Observable<IResponse> {
        return this.verifyResetCodeUseCase.execute({ email, code });
    }
}
