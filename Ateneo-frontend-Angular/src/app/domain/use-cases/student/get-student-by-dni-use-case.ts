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
    private readonly BASE_URL = buildApiUrl('students');
    private urlByDni!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetStudentByDniParams): Observable<Student> {
        this.urlByDni = `${this.BASE_URL}/by-dni/${params.dni}`;
        return this.httpClient.get<Student>(this.urlByDni);
    }
}
