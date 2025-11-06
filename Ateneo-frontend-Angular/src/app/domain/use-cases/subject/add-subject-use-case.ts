import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';
import { buildApiUrl } from '../../../utils/api';

export interface IAddSubjectParams {
}



@Injectable({
    providedIn: 'root'
})
export class AddSubjectUseCase implements useCase<IResponse, IAddSubjectParams> {
    private BASE_URL = buildApiUrl('subjects');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddSubjectParams): Observable<IResponse> {
        const { subject, idProfessor } = params as any;
        let url = `${this.BASE_URL}/add/`;
        if (idProfessor) {
            url += `?professorId=${encodeURIComponent(idProfessor)}`;
        }
        return this.httpClient.post<IResponse>(url, {
            ...subject
        });
    }
}
