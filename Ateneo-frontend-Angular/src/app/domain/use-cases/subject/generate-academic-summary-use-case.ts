import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../utils/api';

export interface IGenerateAcademicSummaryParams {
    subjectId: string;
    studentIds?: string[]; // Si no se envía, se toman todos los estudiantes
    email?: boolean; // Si es true, se envía por email en lugar de descargar
    professor?: boolean; // Si email es true, indica si se envía al profesor o a los estudiantes
    pdf?: boolean; // Si es true, se genera el PDF usando el endpoint separado
}

export interface IGenerateAcademicSummaryResponse {
    filename?: string;
    pdfBase64?: string;
    emailSent?: boolean;
    message?: string;
    studentsWithoutEmail?: Array<{ id: string; name: string }>;
}

@Injectable({ providedIn: 'root' })
export class GenerateAcademicSummaryUseCase {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private http: HttpClient) {}

    execute(params: IGenerateAcademicSummaryParams): Observable<IGenerateAcademicSummaryResponse> {
        const { subjectId, studentIds, email, professor } = params;
        this.url = `${this.BASE_URL}/${subjectId}/generate-academic-summary`;
        let body: any = { studentIds };

        if (email === true) {
            this.url = `${this.BASE_URL}/${subjectId}/send-academic-summary-email`;
            body = { studentIds, professor };
        } else if (params.pdf === true) {
            this.url = `${this.BASE_URL}/${subjectId}/generate-academic-summary-pdf`;
            body = { studentIds };
        }

        return this.http.post<IGenerateAcademicSummaryResponse>(this.url, body);
    }
}
