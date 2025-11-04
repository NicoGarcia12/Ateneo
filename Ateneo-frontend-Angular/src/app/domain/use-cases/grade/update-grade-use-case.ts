import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Grade } from '../../entities/grade';
import { buildApiUrl } from '../../../utils/api';

export interface IUpdateGradeParams {
    gradeId: string;
    name: string;
    date: string;
    description?: string;
    baseGrades?: Array<{ gradeId: string; weight: number }>;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateGradeUseCase implements useCase<Grade, IUpdateGradeParams> {
    private BASE_URL = buildApiUrl('grades');

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateGradeParams): Observable<Grade> {
        const { gradeId, ...updateData } = params;
        return this.httpClient.put<Grade>(`${this.BASE_URL}/${gradeId}`, updateData);
    }
}
