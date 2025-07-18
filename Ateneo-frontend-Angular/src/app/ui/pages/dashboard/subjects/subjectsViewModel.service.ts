import { Injectable } from '@angular/core';
import { GetAllSubjectsUseCase } from '../../../../domain/use-cases/subject-use-cases/get-all-subjects-use-case';
import { TokenService } from '../../../shared/services/token.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../../../../domain/entities/subject';
import { AddSubjectUseCase } from '../../../../domain/use-cases/subject-use-cases/add-subject-use-case';

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

    public addSubject(subject: Subject): Observable<any> {
        return this.addSubjectUseCase.execute({
            subject,
            idProfessor: this.professorId!
        });
    }
}
