import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResponse } from '../use-case.interface';
import { buildApiUrl } from '../../../utils/api';

export interface IAddStudentGradeParams {
    gradeId: string;
    studentId: string;
    value: number | null;
}

export interface AddStudentGradeResponse {
    message: string;
    data: any;
}

@Injectable({
    providedIn: 'root'
})
export class AddStudentGradeUseCase implements useCase<IResponse, IAddStudentGradeParams> {
    private BASE_URL = buildApiUrl('grades');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddStudentGradeParams): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.BASE_URL}/${params.gradeId}/student/${params.studentId}`, { value: params.value });
    }
}
