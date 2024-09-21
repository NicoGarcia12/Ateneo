import { Observable } from 'rxjs';

export interface useCase<T, P = void> {
    execute(params: P): Observable<T>;
}
