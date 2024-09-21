import { Professor } from '../entities/professor.model';

export class ProfessorService {
    getProfessorByLogin(): Professor {
        return new Professor();
    }
}
