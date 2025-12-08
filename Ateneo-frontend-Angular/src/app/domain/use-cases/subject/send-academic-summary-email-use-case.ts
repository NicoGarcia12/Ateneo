import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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
    constructor(private http: HttpClient) {}

    execute(params: ISendAcademicSummaryEmailParams): Observable<ISendAcademicSummaryEmailResponse> {
        const { subjectId, studentIds, professor } = params;
        const url = `${environment.apiBaseUrl}/subjects/${subjectId}/send-academic-summary-email`;
        return this.http.post<ISendAcademicSummaryEmailResponse>(url, { studentIds, professor });
    }
}
