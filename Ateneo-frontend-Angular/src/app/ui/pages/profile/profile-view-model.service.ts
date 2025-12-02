import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetProfessorUseCase } from '../../../domain/use-cases/professor/get-professor-use-case';
import { UpdateProfessorUseCase, IUpdateProfessorParams } from '../../../domain/use-cases/professor/update-professor-use-case';
import { Professor } from '../../../domain/entities/professor';
import { IResponse } from '../../../domain/use-cases/use-case.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileViewModelService {
    constructor(
        private getProfessorUseCase: GetProfessorUseCase,
        private updateProfessorUseCase: UpdateProfessorUseCase
    ) {}

    public getProfessor(professorId: string): Observable<Professor> {
        return this.getProfessorUseCase.execute({ professorId });
    }

    public updateProfessor(params: IUpdateProfessorParams): Observable<IResponse> {
        return this.updateProfessorUseCase.execute(params);
    }
}
