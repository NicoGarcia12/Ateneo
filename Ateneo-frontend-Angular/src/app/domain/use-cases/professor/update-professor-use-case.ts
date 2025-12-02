import { HttpClient } from '@angular/common/http';
import { useCase, IResponse } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { buildApiUrl } from '../../../utils/api';

export interface IUpdateProfessorParams {
    professorId: string;
    firstName?: string;
    lastName?: string;
    password: string;
    resetPassword?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UpdateProfessorUseCase implements useCase<IResponse, IUpdateProfessorParams> {
    private BASE_URL = buildApiUrl('professors');

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateProfessorParams): Observable<IResponse> {
        const { professorId, ...updateData } = params;
        return this.httpClient.put<IResponse>(`${this.BASE_URL}/${professorId}`, updateData);
    }
}
