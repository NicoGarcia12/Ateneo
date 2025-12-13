import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../utils/api';

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
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private http: HttpClient) {}

    execute(params: IGenerateAcademicSummaryPDFParams): Observable<IGenerateAcademicSummaryPDFResponse> {
        const { subjectId, studentIds } = params;
        this.url = `${this.BASE_URL}/${subjectId}/generate-academic-summary-pdf`;
        return this.http.post<IGenerateAcademicSummaryPDFResponse>(this.url, { studentIds });
    }
}
