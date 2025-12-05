import { Injectable } from '@angular/core';
import { GenerateAcademicSummaryUseCase } from 'src/app/domain/use-cases/subject/generate-academic-summary-use-case';
import { NotifyService } from 'src/app/ui/shared/services/notify.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AcademicSummaryPanelViewModelService {
    private isGeneratingPDFSubject = new BehaviorSubject<boolean>(false);
    public isGeneratingPDF$: Observable<boolean> = this.isGeneratingPDFSubject.asObservable();

    constructor(
        private generateAcademicSummaryUseCase: GenerateAcademicSummaryUseCase,
        private notifyService: NotifyService
    ) {}

    public generatePDF(subjectId: string, studentIds?: string[]): void {
        this.isGeneratingPDFSubject.next(true);
        this.generateAcademicSummaryUseCase.execute({ subjectId, studentIds }).subscribe({
            next: (response) => {
                // Convertir el base64 a Blob
                const byteCharacters = atob(response.pdfBase64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

                // Descargar con el nombre que viene del backend
                const url = window.URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = response.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                this.isGeneratingPDFSubject.next(false);
                this.notifyService.notify('Resumen académico generado y descargado exitosamente', 'success-notify', 'Cerrar', 5);
            },
            error: (error) => {
                this.isGeneratingPDFSubject.next(false);
                console.error('Error al generar el PDF:', error);
                this.notifyService.notify(
                    'Error al generar el resumen académico. Por favor, intenta nuevamente.',
                    'error-notify',
                    'Cerrar',
                    6
                );
            }
        });
    }
}
