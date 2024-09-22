import { Injectable } from '@angular/core';
import { SignUpUseCase } from '../../../domain/use-cases/professor-use-cases/sign-up-use-case';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SignUpViewModelService {
    public constructor(private signUpUseCase: SignUpUseCase) {}

    public signUp(email: string, password: string, firstName: string, lastName: string): Observable<Object> {
        return this.signUpUseCase.execute({ email, password, firstName, lastName });
    }
}
