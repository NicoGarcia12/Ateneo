import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Student } from '../../entities/student';
import { buildApiUrl } from '../../../utils/api';

export interface IGetStudentByDniParams {
    dni: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetStudentByDniUseCase implements useCase<Student, IGetStudentByDniParams> {
    private BASE_URL = buildApiUrl('students');

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetStudentByDniParams): Observable<Student> {
        return this.httpClient.get<{ student: Student }>(`${this.BASE_URL}/by-dni/${params.dni}`).pipe(map((response) => response.student));
    }
}
