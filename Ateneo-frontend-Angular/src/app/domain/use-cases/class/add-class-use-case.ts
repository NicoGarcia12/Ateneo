import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface IAddClassParams {
    date: string;
    description?: string | null;
    absentStudents?: Array<{ id: string; justificado?: boolean }>;
    subjectId: string;
}

export interface ClassResponse {
    id: string;
    date: string;
    description?: string | null;
    subjectId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddClassUseCase implements useCase<IResponse, IAddClassParams> {
    private readonly BASE_URL = buildApiUrl('classes');
    private urlAdd = `${this.BASE_URL}/add`;

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddClassParams): Observable<IResponse> {
        return this.httpClient.post<IResponse>(this.urlAdd, params);
    }
}
