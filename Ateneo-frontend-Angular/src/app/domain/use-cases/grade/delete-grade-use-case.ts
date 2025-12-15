import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../utils/api';
import { useCase } from '../use-case.interface';

export interface IDeleteGradeParams {
    gradeId: string;
}

export interface IDeleteGradeResponse {
    message: string;
}

@Injectable({ providedIn: 'root' })
export class DeleteGradeUseCase implements useCase<IDeleteGradeResponse, IDeleteGradeParams> {
    private readonly BASE_URL = buildApiUrl('grades');

    constructor(private http: HttpClient) {}

    execute(params: IDeleteGradeParams): Observable<IDeleteGradeResponse> {
        const url = `${this.BASE_URL}/${params.gradeId}`;
        return this.http.delete<IDeleteGradeResponse>(url);
    }
}
