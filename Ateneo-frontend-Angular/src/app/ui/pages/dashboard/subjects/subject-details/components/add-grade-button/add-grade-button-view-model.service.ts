import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddGradeUseCase, IAddGradeParams } from 'src/app/domain/use-cases/grade/add-grade-use-case';
import { Grade } from 'src/app/domain/entities/grade';

@Injectable({
    providedIn: 'root'
})
export class AddGradeButtonViewModelService {
    constructor(private addGradeUseCase: AddGradeUseCase) {}

    public addGrade(params: IAddGradeParams): Observable<Grade> {
        return this.addGradeUseCase.execute(params);
    }
}
