import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Class } from '../../entities/class';
import { buildApiUrl } from '../../../utils/api';

export interface IGetClassesBySubjectParams {
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetClassesBySubjectUseCase implements useCase<Array<Class>, IGetClassesBySubjectParams> {
    private BASE_URL = buildApiUrl('classes');

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetClassesBySubjectParams): Observable<Class[]> {
        return this.httpClient.get<Class[]>(`${this.BASE_URL}/by-subject/${params.subjectId}`);
    }
}
