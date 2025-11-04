import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface IAddStudentGradeParams {
    gradeId: string;
    studentId: string;
    value: number | null;
}

@Injectable({
    providedIn: 'root'
})
export class AddStudentGradeUseCase implements useCase<any, IAddStudentGradeParams> {
    private BASE_URL = buildApiUrl('grades');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddStudentGradeParams): Observable<any> {
        return this.httpClient.post<any>(`${this.BASE_URL}/${params.gradeId}/student/${params.studentId}`, { value: params.value });
    }
}
