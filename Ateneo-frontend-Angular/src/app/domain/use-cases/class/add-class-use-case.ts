import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface IAddClassParams {
    date: string;
    description?: string | null;
    absentStudents?: Array<{ id: string; justificado?: boolean }>;
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddClassUseCase implements useCase<{ message: string }, IAddClassParams> {
    private BASE_URL = buildApiUrl('classes');

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddClassParams): Observable<{ message: string }> {
        return this.httpClient.post<{ message: string }>(`${this.BASE_URL}/add`, params);
    }
}
