import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SubjectsViewModelService } from './subjectsViewModel.service';
import { Subject } from '../../../../domain/entities/subject';
import { TokenService } from '../../../shared/services/token.service';
import { NotifyService } from '../../../shared/services/notify.service';

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
        public tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.subjectForm = this.fb.group({
            name: ['', Validators.required],
            institution: ['', Validators.required],
            degree: ['', Validators.required],
            academicYear: ['', [Validators.required, this.academicYearValidator]]
        });

        this.subjectsViewModel.getAllSubjects().subscribe(
            (subjects) => {
                this.subjects = subjects;
            },
            (error) => {
                this.notifyService.notify(error.error.message, 'error', 'Cerrar');
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

        // this.subjectsViewModel.addSubject(newSubject).subscribe(
        //     (subject) => {
        //         this.subjects.push(subject);
        //         this.subjectForm.reset();
        //         this.showForm = false;
        // this.addSubjectLoading = false;
        //     },
        //     (error) => {
        //                         this.notifyService.notify(error.error.message, 'error', 'Cerrar');
        // this.addSubjectLoading = false;
        // throw error.error.message;
        //     }
        // );
    }
}
