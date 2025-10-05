import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../utils/api';
import { useCase } from '../use-case.interface';

export interface IDeleteClassParams {
    id: string;
}

@Injectable({ providedIn: 'root' })
export class DeleteClassUseCase implements useCase<{ message: string }, IDeleteClassParams> {
    private BASE_URL = buildApiUrl('classes');

    constructor(private http: HttpClient) {}

    execute(params: IDeleteClassParams): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.BASE_URL}/${params.id}`);
    }
}
