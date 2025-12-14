import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IUpdateSubjectUseCase {
    subjectId: string;
    name?: string;
    academicYear?: number;
    institution?: string;
    degree?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateSubjectUseCase implements useCase<IResponse, IUpdateSubjectUseCase> {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateSubjectUseCase): Observable<IResponse> {
        this.url = `${this.BASE_URL}/${params.subjectId}`;
        const { subjectId, ...data } = params;
        return this.httpClient.put<IResponse>(this.url, data);
    }
}
