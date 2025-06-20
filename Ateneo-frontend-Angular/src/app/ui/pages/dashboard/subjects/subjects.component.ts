import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SubjectsViewModelService } from './subjectsViewModel.service';
import { Subject } from '../../../../domain/entities/subject';
import { TokenService } from '../../../shared/services/token.service';
import { NotifyService } from '../../../shared/services/notify.service';
import { Router } from '@angular/router';
import { DashboardTitleService } from '../dashboard-title.service';

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
    public subjects: Array<Subject> = [];
    public showForm: boolean = false;
    public subjectForm!: FormGroup;
    public addSubjectLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private subjectsViewModel: SubjectsViewModelService,
        private notifyService: NotifyService,
        private router: Router,
        private dashboardTitleService: DashboardTitleService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.subjectForm = this.fb.group({
            name: ['', Validators.required],
            institution: ['', Validators.required],
            degree: ['', Validators.required],
            academicYear: ['', [Validators.required, this.academicYearValidator]]
        });
        this.dashboardTitleService.setTitle(`Bienvenido ${this.tokenService.getUserFromToken()?.firstName}`);
        this.getAllSubjects();
    }

    private getAllSubjects(): void {
        this.subjectsViewModel.getAllSubjects().subscribe(
            (subjects) => {
                this.subjects = subjects;
            },
            (error) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                throw error.error.message;
            }
        );
    }

    public academicYearValidator(control: AbstractControl): ValidationErrors | null {
        const year = control.value;

        if (!year) {
            return null;
        }

        if (year < 1970) {
            return { invalidYear: true };
        }
        return null;
    }

    public hasError(field: string, errorType: string): boolean | undefined {
        const control = this.subjectForm.get(field);
        return control?.hasError(errorType) && control?.touched;
    }

    public switchForm(): void {
        this.showForm = !this.showForm;
    }

    public addSubject(): void {
        if (this.subjectForm.invalid) {
            return;
        }

        this.addSubjectLoading = true;

        const newSubject = this.subjectForm.value as Subject;

        this.subjectsViewModel.addSubject(newSubject).subscribe(
            (success) => {
                this.notifyService.notify(success.message, 'success-notify');
                this.addSubjectLoading = false;
                this.subjectForm.reset();
                this.showForm = false;
                this.getAllSubjects();
            },
            (error) => {
                this.notifyService.notify(error.error.message, 'error-notify', 'Cerrar');
                this.addSubjectLoading = false;
                this.subjectForm.reset();
                this.showForm = false;
                throw error.error.message;
            }
        );
    }

    public openSubject(idSubject: string): void {
        this.router.navigate([`/dashboard/subject/${idSubject}`]);
    }
}
