import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from '../../entities/student';
import { buildApiUrl } from '../../../utils/api';

export interface IGetStudentsBySubjectParams {
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetStudentsBySubjectUseCase implements useCase<Array<Student>, IGetStudentsBySubjectParams> {
    private readonly BASE_URL = buildApiUrl('students');
    private urlBySubject!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetStudentsBySubjectParams): Observable<Array<Student>> {
        this.urlBySubject = `${this.BASE_URL}/by-subject/${params.subjectId}`;
        return this.httpClient.get<Array<Student>>(this.urlBySubject);
    }
}
