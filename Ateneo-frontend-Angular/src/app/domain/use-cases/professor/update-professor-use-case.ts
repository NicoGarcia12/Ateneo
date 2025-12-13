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
    private readonly BASE_URL = buildApiUrl('professors');
    private urlUpdate!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IUpdateProfessorParams): Observable<IResponse> {
        const { professorId, ...updateData } = params;
        this.urlUpdate = `${this.BASE_URL}/${professorId}`;
        return this.httpClient.put<IResponse>(this.urlUpdate, updateData);
    }
}
