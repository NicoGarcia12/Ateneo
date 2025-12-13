import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

interface IRemoveStudentFromSubjectUseCase {
    subjectId: string;
    studentId: string;
}

@Injectable({
    providedIn: 'root'
})
export class RemoveStudentFromSubjectUseCase implements useCase<IResponse, IRemoveStudentFromSubjectUseCase> {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IRemoveStudentFromSubjectUseCase): Observable<IResponse> {
        this.url = `${this.BASE_URL}/${params.subjectId}/remove-student/${params.studentId}`;
        return this.httpClient.delete<IResponse>(this.url);
    }
}
