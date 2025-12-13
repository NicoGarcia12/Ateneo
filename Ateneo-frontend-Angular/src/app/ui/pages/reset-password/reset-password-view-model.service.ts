import { Injectable } from '@angular/core';
import { ResetPasswordUseCase } from '../../../domain/use-cases/professor/reset-password-use-case';
import { Observable } from 'rxjs';
import { IResponse } from '../../../domain/use-cases/use-case.interface';

@Injectable({ providedIn: 'root' })
export class ResetPasswordViewModelService {
    constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

    resetPassword(email: string, code: string, newPassword: string): Observable<IResponse> {
        return this.resetPasswordUseCase.execute({ email, code, newPassword });
    }
}
