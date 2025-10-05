import { HttpClient, HttpParams } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from '../../entities/student';
import { buildApiUrl } from '../../../utils/api';

export interface IAddStudentParams {
    firstName: string;
    lastName: string;
    dni: string;
    email?: string;
    phone?: string;
    subjectId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddStudentUseCase implements useCase<Student, IAddStudentParams> {
    private BASE_URL = buildApiUrl('students');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddStudentParams): Observable<Student> {
        let httpParams = new HttpParams();

        if (params.subjectId) {
            httpParams = httpParams.set('subjectId', params.subjectId);
        }

        const body = {
            firstName: params.firstName,
            lastName: params.lastName,
            dni: params.dni,
            email: params.email,
            phone: params.phone
        };

        return this.httpClient
            .post<{ student: Student }>(`${this.BASE_URL}/add`, body, { params: httpParams })
            .pipe(map((response) => response.student));
    }
}
