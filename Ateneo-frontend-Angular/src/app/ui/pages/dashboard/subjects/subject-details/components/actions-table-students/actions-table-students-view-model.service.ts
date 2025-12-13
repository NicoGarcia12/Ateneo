import { Injectable } from '@angular/core';
import { RemoveStudentFromSubjectUseCase } from 'src/app/domain/use-cases/subject/remove-student-from-subject-use-case';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/domain/use-cases/use-case.interface';

@Injectable({ providedIn: 'root' })
export class ActionsTableStudentsViewModelService {
  constructor(
    private removeStudentFromSubjectUseCase: RemoveStudentFromSubjectUseCase,
  ) {}

  removeStudentFromSubject(subjectId: string, studentId: string): Observable<IResponse> {
    return this.removeStudentFromSubjectUseCase.execute({ subjectId, studentId });
  }
}
