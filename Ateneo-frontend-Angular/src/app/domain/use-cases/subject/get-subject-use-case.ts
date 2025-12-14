import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';
import { Subject } from '../../entities/subject';

interface IGetSubjectUseCase {
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetSubjectUseCase implements useCase<Subject, IGetSubjectUseCase> {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetSubjectUseCase): Observable<Subject> {
        this.url = `${this.BASE_URL}/${params.subjectId}`;
        return this.httpClient.get<Subject>(this.url);
    }
}
