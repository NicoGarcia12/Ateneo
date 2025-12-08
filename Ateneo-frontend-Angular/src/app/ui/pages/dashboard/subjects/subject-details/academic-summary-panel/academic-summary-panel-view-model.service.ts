import { Injectable } from '@angular/core';
import { GenerateAcademicSummaryPDFUseCase } from 'src/app/domain/use-cases/subject/generate-academic-summary-pdf-use-case';
import { SendAcademicSummaryEmailUseCase } from 'src/app/domain/use-cases/subject/send-academic-summary-email-use-case';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileUtils } from 'src/app/utils/file.utils';

@Injectable({ providedIn: 'root' })
export class AcademicSummaryPanelViewModelService {
    private isGeneratingPDFSubject = new BehaviorSubject<boolean>(false);
    private isSendingEmailToMeSubject = new BehaviorSubject<boolean>(false);
    private isSendingEmailToStudentsSubject = new BehaviorSubject<boolean>(false);

    public isGeneratingPDF$: Observable<boolean> = this.isGeneratingPDFSubject.asObservable();
    public isSendingEmailToMe$: Observable<boolean> = this.isSendingEmailToMeSubject.asObservable();
    public isSendingEmailToStudents$: Observable<boolean> = this.isSendingEmailToStudentsSubject.asObservable();

    constructor(
        private generateAcademicSummaryPDFUseCase: GenerateAcademicSummaryPDFUseCase,
        private sendAcademicSummaryEmailUseCase: SendAcademicSummaryEmailUseCase,
        private notifyService: NotifyService
    ) {}

    public generatePDF(subjectId: string, studentIds?: string[]): void {
        this.isGeneratingPDFSubject.next(true);
        this.generateAcademicSummaryPDFUseCase.execute({ subjectId, studentIds }).subscribe({
            next: (response) => {
                const pdfBlob = FileUtils.base64ToBlob(response.pdfBase64 ?? '');
                FileUtils.downloadBlob(pdfBlob, response.filename ?? 'reporte-academico.pdf');
                this.isGeneratingPDFSubject.next(false);
                this.notifyService.notify('Resumen académico generado y descargado exitosamente', 'success-notify', 'Cerrar');
            },
            error: (error) => {
                this.isGeneratingPDFSubject.next(false);
                console.error('Error al generar el PDF:', error);
                this.notifyService.notify(
                    'Error al generar el resumen académico. Por favor, intenta nuevamente.',
                    'error-notify',
                    'Cerrar'
                );
            }
        });
    }

    public sendEmailToMe(subjectId: string, studentIds?: string[]): void {
        this.isSendingEmailToMeSubject.next(true);
        this.sendAcademicSummaryEmailUseCase.execute({ subjectId, studentIds, professor: true }).subscribe({
            next: (response) => this.handleEmailSuccess(response, 'tu correo', true),
            error: (error) => this.handleEmailError(error, true)
        });
    }

    public sendEmailToStudents(subjectId: string, studentIds?: string[]): void {
        this.isSendingEmailToStudentsSubject.next(true);
        this.sendAcademicSummaryEmailUseCase.execute({ subjectId, studentIds, professor: false }).subscribe({
            next: (response) => this.handleEmailSuccess(response, 'estudiantes', false),
            error: (error) => this.handleEmailError(error, false)
        });
    }

    private handleEmailSuccess(response: any, destination: string, isProfessor: boolean): void {
        this.setEmailLoadingState(isProfessor, false);
        if (response.emailSent) {
            this.notifyService.notify(`Resumen académico enviado exitosamente a ${destination}`, 'success-notify', 'Cerrar');
        }
    }

    private handleEmailError(error: any, isProfessor: boolean): void {
        this.setEmailLoadingState(isProfessor, false);
        const errorMessage = error.error?.error || 'Error al enviar el resumen académico por email.';
        this.notifyService.notify(errorMessage, 'error-notify', 'Cerrar');
    }

    private setEmailLoadingState(isProfessor: boolean, isLoading: boolean): void {
        if (isProfessor) {
            this.isSendingEmailToMeSubject.next(isLoading);
        } else {
            this.isSendingEmailToStudentsSubject.next(isLoading);
        }
    }
}
