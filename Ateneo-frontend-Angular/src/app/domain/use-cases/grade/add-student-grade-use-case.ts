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
    private readonly BASE_URL = buildApiUrl('grades');
    private urlAddStudentGrade!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddStudentGradeParams): Observable<IResponse> {
        this.urlAddStudentGrade = `${this.BASE_URL}/${params.gradeId}/student/${params.studentId}`;
        return this.httpClient.post<IResponse>(this.urlAddStudentGrade, { value: params.value });
    }
}
