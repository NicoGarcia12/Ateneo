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
    private BASE_URL = buildApiUrl('grades');

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetGradesBySubjectParams): Observable<Array<Grade>> {
        return this.httpClient.get<Array<Grade>>(`${this.BASE_URL}/by-subject/${params.subjectId}`);
    }
}
