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
    private readonly BASE_URL = buildApiUrl('classes');
    private urlBySubject!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetClassesBySubjectParams): Observable<Class[]> {
        this.urlBySubject = `${this.BASE_URL}/by-subject/${params.subjectId}`;
        return this.httpClient.get<Class[]>(this.urlBySubject);
    }
}
