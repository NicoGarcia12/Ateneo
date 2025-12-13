import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';
import { buildApiUrl } from '../../../utils/api';

export interface IAddSubjectParams {}

@Injectable({
    providedIn: 'root'
})
export class AddSubjectUseCase implements useCase<IResponse, IAddSubjectParams> {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddSubjectParams): Observable<IResponse> {
        const { subject, idProfessor } = params as any;
        this.url = `${this.BASE_URL}/add/`;
        if (idProfessor) {
            this.url += `?professorId=${encodeURIComponent(idProfessor)}`;
        }
        return this.httpClient.post<IResponse>(this.url, {
            ...subject
        });
    }
}
