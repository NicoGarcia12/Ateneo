import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';

export interface IGetAllSubjectsParams {
    idProfessor: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetAllSubjectsUseCase implements useCase<Array<Subject>, IGetAllSubjectsParams> {
    private BASE_URL = 'http://localhost:3001/professors';

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetAllSubjectsParams): Observable<Array<Subject>> {
        return this.httpClient
            .get<{
                subjects: Array<Subject>;
            }>(`${this.BASE_URL}/${params.idProfessor}/subjects`)
            .pipe(map((response) => response.subjects));
    }
}
