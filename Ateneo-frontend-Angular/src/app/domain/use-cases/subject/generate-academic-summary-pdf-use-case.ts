import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface IGenerateAcademicSummaryPDFParams {
    subjectId: string;
    studentIds?: string[];
}

export interface IGenerateAcademicSummaryPDFResponse {
    filename?: string;
    pdfBase64?: string;
}

@Injectable({ providedIn: 'root' })
export class GenerateAcademicSummaryPDFUseCase {
    constructor(private http: HttpClient) {}

    execute(params: IGenerateAcademicSummaryPDFParams): Observable<IGenerateAcademicSummaryPDFResponse> {
        const { subjectId, studentIds } = params;
        const url = `${environment.apiBaseUrl}/subjects/${subjectId}/generate-academic-summary-pdf`;
        return this.http.post<IGenerateAcademicSummaryPDFResponse>(url, { studentIds });
    }
}
