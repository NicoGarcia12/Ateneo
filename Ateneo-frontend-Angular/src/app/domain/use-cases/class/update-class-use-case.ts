import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
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
export class UpdateClassUseCase implements useCase<IResponse, IUpdateClassParams> {
    private BASE_URL = buildApiUrl('classes');

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateClassParams): Observable<IResponse> {
        return this.httpClient.put<IResponse>(`${this.BASE_URL}/${params.classId}`, params);
    }
}
