import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { useCase, IResponse } from '../use-case.interface';
import { buildApiUrl } from 'src/app/utils/api';

export interface IUpdateStudentParams {
    studentId: string;
    firstName: string;
    lastName: string;
    dni: string;
    email?: string;
    phone?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateStudentUseCase implements useCase<IResponse, IUpdateStudentParams> {
    private readonly BASE_URL = buildApiUrl('students');

    constructor(private http: HttpClient) {}

    execute(params: IUpdateStudentParams): Observable<IResponse> {
        const { studentId, ...studentData } = params;
        return this.http.put<IResponse>(`${this.BASE_URL}/${studentId}`, studentData);
    }
}
