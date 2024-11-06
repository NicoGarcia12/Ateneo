import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';

export interface IGetAllSubjectsParams {
    idProfessor: string;
}

export interface GetAllSubjectsResponse {
    subjects: Array<Subject>;
}

@Injectable({
    providedIn: 'root'
})
export class GetAllSubjectsUseCase implements useCase<GetAllSubjectsResponse, IGetAllSubjectsParams> {
    private BASE_URL = 'http://localhost:3001/subjects/professor';

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetAllSubjectsParams): Observable<GetAllSubjectsResponse> {
        return this.httpClient.get<GetAllSubjectsResponse>(`${this.BASE_URL}/${params.idProfessor}`);
    }
}
