import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
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
export class UpdateGradeUseCase implements useCase<IResponse, IUpdateGradeParams> {
    private readonly BASE_URL = buildApiUrl('grades');
    private urlUpdate!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateGradeParams): Observable<IResponse> {
        const { gradeId, ...updateData } = params;
        this.urlUpdate = `${this.BASE_URL}/${gradeId}`;
        return this.httpClient.put<IResponse>(this.urlUpdate, updateData);
    }
}
