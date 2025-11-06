import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';
import { Student } from '../../entities/student';

export interface IAddStudentToSubjectParams {
    studentId: string;
    subjectId: string;
}



@Injectable({
    providedIn: 'root'
})
export class AddStudentToSubjectUseCase implements useCase<IResponse, IAddStudentToSubjectParams> {
    private BASE_URL = buildApiUrl('subjects');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddStudentToSubjectParams): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.BASE_URL}/${params.subjectId}/add-student/${params.studentId}`, {});
    }
}
