import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';
import { buildApiUrl } from '../../../utils/api';

export interface IAddSubjectParams {
    subject: Subject;
    idProfessor?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddSubjectUseCase implements useCase<Subject, IAddSubjectParams> {
    private BASE_URL = buildApiUrl('subjects');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddSubjectParams): Observable<Subject> {
        const { subject, idProfessor } = params;
        let url = `${this.BASE_URL}/add/`;
        if (idProfessor) {
            url += `?professorId=${encodeURIComponent(idProfessor)}`;
        }
        return this.httpClient.post<Subject>(url, {
            ...subject
        });
    }
}
