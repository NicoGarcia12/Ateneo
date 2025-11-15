import { Injectable } from '@angular/core';
import { SignUpUseCase } from '../../../domain/use-cases/professor/sign-up-use-case';
import { IResponse } from '../../../domain/use-cases/use-case.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignUpViewModelService {
    public constructor(private signUpUseCase: SignUpUseCase) {}

    public signUp(email: string, password: string, firstName: string, lastName: string): Observable<IResponse> {
        return this.signUpUseCase.execute({
            email,
            password,
            firstName,
            lastName
        });
    }
}
