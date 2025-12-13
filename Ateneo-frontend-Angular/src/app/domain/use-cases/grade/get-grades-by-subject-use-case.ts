import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Grade } from '../../entities/grade';
import { buildApiUrl } from '../../../utils/api';

export interface IGetGradesBySubjectParams {
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetGradesBySubjectUseCase implements useCase<Array<Grade>, IGetGradesBySubjectParams> {
    private readonly BASE_URL = buildApiUrl('grades');
    private urlBySubject!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetGradesBySubjectParams): Observable<Array<Grade>> {
        this.urlBySubject = `${this.BASE_URL}/by-subject/${params.subjectId}`;
        return this.httpClient.get<Array<Grade>>(this.urlBySubject);
    }
}
