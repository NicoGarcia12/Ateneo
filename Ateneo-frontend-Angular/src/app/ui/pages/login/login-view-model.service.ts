import { Injectable } from '@angular/core';
import { LoginUseCase } from '../../../domain/use-cases/professor/login-use-case';
import { Observable } from 'rxjs';
import { IResponse } from '../../../domain/use-cases/use-case.interface';

@Injectable({
    providedIn: 'root'
})
export class LoginViewModelService {
    public constructor(private loginUseCase: LoginUseCase) {}

    public login(email: string, password: string): Observable<IResponse> {
        return this.loginUseCase.execute({ email, password });
    }
}
