import { Injectable } from '@angular/core';
import { GetAllSubjectsUseCase, GetAllSubjectsResponse } from '../../../../domain/use-cases/subject-use-cases/get-all-subjects-use-case';
import { TokenService } from '../../../shared/services/token.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from '../../../../domain/entities/subject';

@Injectable({
    providedIn: 'root'
})
export class SubjectsViewModelService {
    constructor(
        private getAllSubjectsUseCase: GetAllSubjectsUseCase,
        private tokenService: TokenService
    ) {}

    public getAllSubjects(): Observable<Array<Subject>> {
        const professor = this.tokenService.getUserFromToken();

        if (professor && professor.id) {
            return this.getAllSubjectsUseCase
                .execute({ idProfessor: professor.id })
                .pipe(map((response: GetAllSubjectsResponse) => response.subjects)); // Extrae el array de materias
        } else {
            return throwError(() => new Error('Ocurrió un error al obtener el Id del profesor'));
        }
    }
}
