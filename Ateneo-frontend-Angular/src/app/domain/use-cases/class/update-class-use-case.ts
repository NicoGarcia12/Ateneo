import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface IUpdateClassParams {
    classId: string;
    description?: string | null;
    absentStudents?: Array<{ id: string; justificado?: boolean }>;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateClassUseCase implements useCase<{ message: string }, IUpdateClassParams> {
    private BASE_URL = buildApiUrl('classes');

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateClassParams): Observable<{ message: string }> {
        return this.httpClient.put<{ message: string }>(`${this.BASE_URL}/${params.classId}`, params);
    }
}
