import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IDeleteSubjectUseCase {
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class DeleteSubjectUseCase implements useCase<IResponse, IDeleteSubjectUseCase> {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IDeleteSubjectUseCase): Observable<IResponse> {
        this.url = `${this.BASE_URL}/${params.subjectId}`;
        return this.httpClient.delete<IResponse>(this.url);
    }
}
