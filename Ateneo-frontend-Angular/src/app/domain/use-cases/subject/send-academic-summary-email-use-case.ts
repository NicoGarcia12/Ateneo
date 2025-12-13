import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { buildApiUrl } from '../../../utils/api';

export interface ISendAcademicSummaryEmailParams {
    subjectId: string;
    studentIds?: string[];
    professor?: boolean;
}

export interface ISendAcademicSummaryEmailResponse {
    emailSent?: boolean;
    message?: string;
    studentsWithoutEmail?: Array<{ id: string; name: string }>;
}

@Injectable({ providedIn: 'root' })
export class SendAcademicSummaryEmailUseCase {
    private readonly BASE_URL = buildApiUrl('subjects');
    private url!: string;

    constructor(private http: HttpClient) {}

    execute(params: ISendAcademicSummaryEmailParams): Observable<ISendAcademicSummaryEmailResponse> {
        const { subjectId, studentIds, professor } = params;
        this.url = `${this.BASE_URL}/${subjectId}/send-academic-summary-email`;
        return this.http.post<ISendAcademicSummaryEmailResponse>(this.url, { studentIds, professor });
    }
}
