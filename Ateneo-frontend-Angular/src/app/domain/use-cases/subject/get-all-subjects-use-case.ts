import { HttpClient } from '@angular/common/http';
import { useCase } from '../use-case.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from '../../entities/subject';
import { buildApiUrl } from '../../../utils/api';

export interface IGetAllSubjectsParams {
    idProfessor: string;
}

@Injectable({
    providedIn: 'root'
})
export class GetAllSubjectsUseCase implements useCase<Array<Subject>, IGetAllSubjectsParams> {
    private BASE_URL = buildApiUrl('professors');

    constructor(private httpClient: HttpClient) {}

    execute(params: IGetAllSubjectsParams): Observable<Array<Subject>> {
        return this.httpClient.get<Array<Subject>>(`${this.BASE_URL}/${params.idProfessor}/subjects`);
    }
}
