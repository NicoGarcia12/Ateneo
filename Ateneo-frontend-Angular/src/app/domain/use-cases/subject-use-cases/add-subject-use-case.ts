import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';

export interface IAddSubjectParams {
    subject: Subject;
    idProfessor: string;
}

@Injectable({
    providedIn: 'root'
})
export class AddSubjectUseCase implements useCase<any, IAddSubjectParams> {
    private BASE_URL = 'http://localhost:3001/professors';

    constructor(private httpClient: HttpClient) {}

    execute(params: IAddSubjectParams): Observable<any> {
        return this.httpClient.post<any>(`${this.BASE_URL}/${params.idProfessor}/subjects`, params);
    }
}
