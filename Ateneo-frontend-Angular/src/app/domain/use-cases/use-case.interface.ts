import { Observable } from 'rxjs';

export interface useCase<TResponse = IResponse, P = void> {
    execute(params: P): Observable<TResponse>;
}

export interface IResponse {
    message: string;
    data: any;
}
