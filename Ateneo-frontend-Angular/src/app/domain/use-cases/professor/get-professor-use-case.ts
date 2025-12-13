import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Professor } from '../../entities/professor';
import { buildApiUrl } from '../../../utils/api';

export interface IGetProfessorParams {
    professorId: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetProfessorUseCase implements useCase<Professor, IGetProfessorParams> {
    private readonly BASE_URL = buildApiUrl('professors');
    private urlGetProfessor!: string;

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetProfessorParams): Observable<Professor> {
        this.urlGetProfessor = `${this.BASE_URL}/${params.professorId}`;
        return this.httpClient.get<Professor>(this.urlGetProfessor);
    }
}
