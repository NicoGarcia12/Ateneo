import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface IGenerateAcademicSummaryParams {
    subjectId: string;
    studentIds?: string[]; // Si no se envía, se toman todos los estudiantes
}

export interface IGenerateAcademicSummaryResponse {
    filename: string;
    pdfBase64: string;
}

@Injectable({ providedIn: 'root' })
export class GenerateAcademicSummaryUseCase {
    constructor(private http: HttpClient) {}

    execute(params: IGenerateAcademicSummaryParams): Observable<IGenerateAcademicSummaryResponse> {
        const { subjectId, studentIds } = params;
        const url = `${environment.apiBaseUrl}/subjects/${subjectId}/generate-academic-summary`;

        return this.http.post<IGenerateAcademicSummaryResponse>(url, { studentIds });
    }
}
