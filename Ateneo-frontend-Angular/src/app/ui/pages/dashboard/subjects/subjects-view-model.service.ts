import { Injectable } from '@angular/core';
import { GetAllSubjectsUseCase } from '../../../../domain/use-cases/subject/get-all-subjects-use-case';
import { TokenService } from '../../../shared/services/token.service';
import { Observable } from 'rxjs';
import { Subject } from '../../../../domain/entities/subject';
import { AddSubjectUseCase } from '../../../../domain/use-cases/subject/add-subject-use-case';
import { IResponse } from '../../../../domain/use-cases/use-case.interface';

@Injectable({
    providedIn: 'root'
})
export class SubjectsViewModelService {
    private professorId: string | undefined;

    constructor(
        private getAllSubjectsUseCase: GetAllSubjectsUseCase,
        private addSubjectUseCase: AddSubjectUseCase,
        private tokenService: TokenService
    ) {}

    public getAllSubjects(): Observable<Array<Subject>> {
        const professor = this.tokenService.getUserFromToken();
        this.professorId = professor?.id;

        return this.getAllSubjectsUseCase.execute({
            idProfessor: this.professorId!
        });
    }

    public addSubject(subject: Subject): Observable<IResponse> {
        return this.addSubjectUseCase.execute({
            subject,
            idProfessor: this.professorId!
        });
    }
}
