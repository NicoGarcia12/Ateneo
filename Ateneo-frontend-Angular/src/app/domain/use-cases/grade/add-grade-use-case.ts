import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Grade, GradeType } from '../../entities/grade';
import { buildApiUrl } from '../../../utils/api';



export interface IAddGradeParams {
    name: string;
    type: GradeType;
    date: string;
    description?: string;
    subjectId: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

@Injectable({
    providedIn: 'root'
})
export class AddGradeUseCase implements useCase<IResponse, IAddGradeParams> {
    private BASE_URL = buildApiUrl('grades');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddGradeParams): Observable<IResponse> {
        return this.httpClient.post<IResponse>(`${this.BASE_URL}/add`, params);
    }
}
