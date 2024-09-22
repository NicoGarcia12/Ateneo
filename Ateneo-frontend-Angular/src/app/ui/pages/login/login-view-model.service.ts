import { Injectable } from '@angular/core';
import { LoginUseCase } from '../../../domain/use-cases/professor-use-cases/login-use-case';
import { Observable } from 'rxjs';
import { Professor } from '../../../domain/entities/professor';

@Injectable({
    providedIn: 'root'
})
export class LoginViewModelService {
    public constructor(private loginUseCase: LoginUseCase) {}

    public login(email: string, password: string): Observable<Professor> {
        return this.loginUseCase.execute({ email, password });
    }
}
